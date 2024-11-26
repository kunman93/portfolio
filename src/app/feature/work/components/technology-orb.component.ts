import { Component, ElementRef, Input, NgZone, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';

@Component({
    selector: 'app-technology-orb',
    templateUrl: './technology-orb.component.html',
    styleUrl: './technology-orb.component.scss'
})
export class TechnologyOrbComponent {
    @Input() technology!: string;

    @ViewChild('canvasTechnologyOrb')
    private canvasRef!: ElementRef;

    // --- Helper properties ----
    private renderer!: THREE.WebGLRenderer;
    private camera!: THREE.PerspectiveCamera;
    private scene!: THREE.Scene;
    private controls!: OrbitControls;

    private clock!: THREE.Clock;
    private orbGroup!: THREE.Group;

    constructor(private zone: NgZone) {
    }

    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => this.createScene());
    }

    private createScene(): void {
        // # Initialising the canvas and the renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: this.canvas });

        // # Setting up the camera
        // ## Setting for the camera
        const fov = 75; // field of view, 75 degree
        const aspect = 2;  // it is the display aspect of the canvas, the default canvas is 300x150 pixel, which makes the aspect 300/150 or 2.
        // near and far represent the space in front of the the camera that will be rendered. Anything before or after that range will be clipped (not drawn)
        const near = 0.1;
        const far = 30;

        // ## Initalising the camera
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // Anything inside the defined frustum will be drawn. Anything outside will not.
        this.camera.position.set(0, 0, -2); // Camera Coordinate System --> left-handed (index finger => x, thumb => y, middle finger => z)

        // # Setting up the scene
        this.scene = new THREE.Scene();

        // Setting up the clock
        this.clock = new THREE.Clock();

        // # Create an Orb with image

        // ## Geometry
        const radius = 1;
        const detail = 2;
        const geometry = new THREE.IcosahedronGeometry(radius, detail);

        // ## Material
        const material = new THREE.MeshPhongMaterial({
            color: 0x808080,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            flatShading: true,
            shininess: 20,
            specular: 0x222222,
        });

        // ## Orb Mesh 
        const orb = new THREE.Mesh(geometry, material);

        // ## DecalGeometry
        const texture = new THREE.TextureLoader().load(this.technology);

        const position = new THREE.Vector3(0, 0, 1);
        const orientation = new THREE.Euler(2 * Math.PI);
        const size = new THREE.Vector3(1, 1, 1);
        const decalGeometry = new DecalGeometry(orb, position, orientation, size);
        const decalMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            flatShading: true,
            shininess: 20,
            specular: 0x222222,
        });
        const decal = new THREE.Mesh(decalGeometry, decalMaterial);
        decal.rotation.y = -Math.PI;

        // ## Add orb and decal to orbGroup
        this.orbGroup = new THREE.Group();
        this.orbGroup.add(orb);
        this.orbGroup.add(decal);

        // ## Add orbGroup to the scene
        this.scene.add(this.orbGroup)

        // # Creating light
        const color = 0xFFFFFF;
        const intensity = 250;
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


        // ## Add light to the scene
        this.scene.add(lightTop);
        this.scene.add(lightBelow);
        this.scene.add(lightLeft);
        this.scene.add(lightRight);
        this.scene.add(lightFront);
        this.scene.add(lightBack);

        // # Add OrbitControl
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.listenToKeyEvents(window); // optional

        // controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.05; // The damping inertia used, default is 0.05

        this.controls.screenSpacePanning = false;
        this.controls.enableZoom = false;
        this.controls.target.set(0, 0, 0); // The focus point of the controls

        this.controls.maxPolarAngle = Math.PI; // How far you can orbit vertically, upper limit. Range is 0 to Math.PI radians, and default is Math.PI. 

        // # Set an animation loop on the renderer
        // ## The function will be called every available frame.
        this.renderer.setAnimationLoop(() => this.animate(this));
    }

    private animate(component: TechnologyOrbComponent): void {
        const time = component.clock.getElapsedTime();

        component.orbGroup.rotation.y += Math.sin(time + 0.48 * Math.PI) * 0.009;
        component.orbGroup.position.x = Math.sin(time) * 0.05;
        component.orbGroup.position.y = Math.sin(time) * 0.25;


        component.onWindowResize();
        component.controls.update();
        component.render();
    }

    // the below code block was added to fix the low resolution or blocky and blurry problems
    private onWindowResize(): void {
        if (this.resizeRendererToDisplaySize()) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }
    }

    private resizeRendererToDisplaySize(): boolean {
        const canvas = this.renderer.domElement;
        const pixelRatio = window.devicePixelRatio; // for handling HD-DPI
        const width = Math.floor(canvas.clientWidth * pixelRatio);
        const height = Math.floor(canvas.clientHeight * pixelRatio);
        const needResize = canvas.width !== width || canvas.height !== height;

        if (needResize) {
            this.renderer.setSize(width, height, false); // Setting updateStyle to false prevents any style changes to the output canvas. 
        }

        return needResize;
    }

    private render(): void {
        this.renderer.render(this.scene, this.camera);
    }
}
