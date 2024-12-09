import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ASSET_PATHS, GLTF_MODELS } from 'assets/assets.constants';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { ThreejsBaseComponent } from 'src/app/shared/components/threejs-base.component';

@Component({
    selector: 'app-planet-earth',
    templateUrl: './planet-earth.component.html',
    styleUrl: './planet-earth.component.scss'
})
export class PlanetEarthComponent extends ThreejsBaseComponent implements AfterViewInit {
    @ViewChild('canvasPlanetEarth')
    private canvasRef!: ElementRef;

    private clock!: THREE.Clock;
    private planetEarthModel!: THREE.Group<THREE.Object3DEventMap>;

    constructor(private zone: NgZone) {
        super();
    }

    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => this.createScene());
    }

    override createScene(): void {
        // # Initialising the canvas and the renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: this.canvas });

        // # Setting up the camera
        // ## Setting for the camera
        const fov = 90; // field of view, 75 degree
        const aspect = 2;  // it is the display aspect of the canvas, the default canvas is 300x150 pixel, which makes the aspect 300/150 or 2.
        // near and far represent the space in front of the the camera that will be rendered. Anything before or after that range will be clipped (not drawn)
        const near = 1;
        const far = 30;

        // ## Initalising the camera
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // Anything inside the defined frustum will be drawn. Anything outside will not.
        this.camera.position.set(0, 0, 8); // Camera Coordinate System --> left-handed (index finger => x, thumb => y, middle finger => z)

        // # Setting up the scene
        this.scene = new THREE.Scene();

        // Setting up the clock
        this.clock = new THREE.Clock();

        // # Load gltf model
        let component: PlanetEarthComponent = this;

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(ASSET_PATHS.gltfModels);

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);
        gltfLoader.load(GLTF_MODELS.planetEarth, async (gltf) => {
            component.planetEarthModel = gltf.scene;

            // wait until the model can be added to the scene without blocking due to shader compilation
            await component.renderer.compileAsync(component.planetEarthModel, component.camera, component.scene);
            component.scene.add(component.planetEarthModel);
        });

        // # Creating lights
        const color = 0xFFFFFF;
        const intensity = 250;
        const lightPos = 5;

        const light = new THREE.PointLight(color, intensity);
        light.position.set(-lightPos, lightPos, lightPos);

        // ## Add lights to the scene
        this.scene.add(light);

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
        this.renderer.setAnimationLoop(() => this.animate(component, () => {
            const time = component.clock.getElapsedTime();
            if (this.planetEarthModel) {
                component.planetEarthModel.rotation.y += Math.PI / 360;
                component.planetEarthModel.position.y = Math.sin(2.5 * time) * 0.125;
            }
        }));
    }
}
