import { AfterViewInit, Component, ElementRef, NgZone, QueryList, ViewChildren } from '@angular/core';
import * as THREE from 'three';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';
import { technologies } from '../data/technologies';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ThreejsBaseComponent } from 'src/app/shared/components/threejs-base.component';

interface SceneElement {
    elem: HTMLElement;
    fn: (time: number, rect: DOMRect) => void;
    ctx: CanvasRenderingContext2D | null;
}

@Component({
    selector: 'app-technology-orbs',
    templateUrl: './technology-orbs.component.html',
    styleUrl: './technology-orbs.component.scss'
})
export class TechnologyOrbsComponent extends ThreejsBaseComponent implements AfterViewInit {
    readonly technologies = technologies;

    @ViewChildren('technologyOrb', { read: ElementRef })
    private technologyOrbRef!: QueryList<ElementRef>;

    private sceneElements: SceneElement[] = [];

    constructor(private zone: NgZone) {
        super();
    }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => this.createScene());
    }

    override createScene(): void {
        const canvas = document.createElement('canvas');
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true });

        this.renderer.setScissorTest(true);

        this.technologyOrbRef.map(elementRef => elementRef.nativeElement).forEach((elem: Element) => {
            const sceneName = (elem as HTMLElement).dataset['diagram'];
            const technology = (elem as HTMLElement).dataset['technology'];
            const sceneInitFunction = this.sceneInitFunctionsByName[sceneName ?? ''];
            const sceneRenderFunction = sceneInitFunction((elem as HTMLElement), technology ?? '');
            this.addScene((elem as HTMLElement), sceneRenderFunction);
        });

        requestAnimationFrame((time) => this.render(time, this));
    }

    private addScene(
        elem: HTMLElement,
        fn: (time: number, rect: DOMRect) => void
    ): void {
        const ctx = document.createElement('canvas').getContext('2d');
        elem.appendChild(ctx!.canvas);
        this.sceneElements.push({ elem, ctx, fn });
    }

    private makeScene(elem: HTMLElement): {
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        controls: OrbitControls
    } {
        const scene = new THREE.Scene();

        const fov = 75;
        const aspect = 2; // the canvas default
        const near = 0.1;
        const far = 30;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 0, -2);

        scene.add(camera);

        const controls = new OrbitControls(camera, elem);

        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.05; // The damping inertia used, default is 0.05

        controls.screenSpacePanning = false;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.target.set(0, 0, 0); // The focus point of the controls

        controls.maxPolarAngle = Math.PI; // How far you can orbit vertically, upper limit. Range is 0 to Math.PI radians, and default is Math.PI. 

        {
            // # Creating light
            const color = 0xFFFFFF;
            const intensity = 150;
            const lightPos = 10;

            const lightTop = new THREE.PointLight(color, intensity);
            lightTop.position.set(0, lightPos, 0);

            const lightBelow = new THREE.PointLight(color, intensity);
            lightBelow.position.set(0, -lightPos, 0);

            const lightLeft = new THREE.PointLight(color, intensity);
            lightLeft.position.set(-lightPos, 0, 0);

            const lightRight = new THREE.PointLight(color, intensity);
            lightRight.position.set(lightPos, 0, 0);

            const lightFront = new THREE.PointLight(color, intensity);
            lightFront.position.set(0, 0, lightPos);

            const lightBack = new THREE.PointLight(color, intensity);
            lightBack.position.set(0, 0, -lightPos);

            // ## Add light to the camera
            camera.add(lightTop);
            camera.add(lightBelow);
            camera.add(lightLeft);
            camera.add(lightRight);
            camera.add(lightFront);
            camera.add(lightBack);
        }

        return { scene, camera, controls };
    }

    private sceneInitFunctionsByName: {
        [key: string]: (elem: HTMLElement, technology: string) => (time: number, rect: DOMRect) => void
    } = {
            'technology-orb': (elem: HTMLElement, technology: string) => {

                const { scene, camera, controls } = this.makeScene(elem);

                // # Create an Orb with image

                // ## Geometry
                const radius = 1;
                const detail = 2;
                const geometry = new THREE.IcosahedronGeometry(radius, detail);

                // ## Material
                const material = new THREE.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    polygonOffset: true,
                    polygonOffsetFactor: 1,
                    flatShading: true,
                    shininess: 30,
                    specular: 0x808080,
                });

                // ## Orb Mesh 
                const orb = new THREE.Mesh(geometry, material);

                // ## DecalGeometry
                const texture = new THREE.TextureLoader().load(technology);

                const position = new THREE.Vector3(0, 0, 1);
                const orientation = new THREE.Euler(2 * Math.PI);
                const size = new THREE.Vector3(1, 1, 1);
                const decalGeometry = new DecalGeometry(orb, position, orientation, size);
                const decalMaterial = new THREE.MeshPhongMaterial({
                    map: texture,
                    transparent: true,
                    flatShading: true,
                    shininess: 50,
                    specular: 0x404040,
                });
                const decal = new THREE.Mesh(decalGeometry, decalMaterial);

                // ## Add orb and decal to orbGroup
                const orbGroup = new THREE.Group();
                orbGroup.add(orb);
                orbGroup.add(decal);
                orbGroup.rotation.y = -Math.PI;

                // ## Add orbGroup to the scene
                scene.add(orbGroup)

                return (time: number, rect: DOMRect) => {
                    orbGroup.rotation.y += Math.sin(time + 0.768 * Math.PI) * 0.0003;
                    orbGroup.position.x = Math.sin(2.5 * time) * 0.125;
                    orbGroup.position.y = Math.sin(1.5 * time) * 0.25;

                    camera.aspect = rect.width / rect.height;
                    camera.updateProjectionMatrix();

                    controls.update();

                    this.renderer.render(scene, camera);
                };
            },
        };

    private render(time: number, component: TechnologyOrbsComponent): void {
        time *= 0.001;

        for (const { elem, fn, ctx } of component.sceneElements) {

            // get the viewport relative position of this element
            const rect = elem.getBoundingClientRect();
            const { left, right, top, bottom, width, height } = rect;
            const rendererCanvas = component.renderer.domElement;

            const isOffscreen =
                bottom < 0 ||
                top > window.innerHeight ||
                right < 0 ||
                left > window.innerWidth;

            if (!isOffscreen) {

                // make sure the renderer's canvas is big enough
                if (rendererCanvas.width < width || rendererCanvas.height < height) {
                    component.renderer.setSize(width, height, false);
                }

                // make sure the canvas for this area is the same size as the area
                if (ctx!.canvas.width !== width || ctx!.canvas.height !== height) {
                    ctx!.canvas.width = width;
                    ctx!.canvas.height = height;
                }

                component.renderer.setScissor(0, 0, width, height);
                component.renderer.setViewport(0, 0, width, height);

                fn(time, rect);

                // copy the rendered scene to this element's canvas
                ctx!.globalCompositeOperation = 'copy';
                ctx!.drawImage(
                    rendererCanvas,
                    0, rendererCanvas.height - height, width, height, // src rect
                    0, 0, width, height
                ); // dst rect

            }

        }

        requestAnimationFrame((time) => this.render(time, this));
    }
}
