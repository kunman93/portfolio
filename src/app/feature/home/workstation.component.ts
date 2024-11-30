import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { assetsPath } from 'assets/assets-path-index';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

@Component({
    selector: 'app-workstation',
    templateUrl: './workstation.component.html',
    styleUrl: './workstation.component.scss'
})
export class WorkstationComponent implements AfterViewInit {
    @ViewChild('canvasWorkingStation')
    private canvasRef!: ElementRef;

    // --- Helper properties ----
    private renderer!: THREE.WebGLRenderer;
    private camera!: THREE.PerspectiveCamera;
    private scene!: THREE.Scene;
    private controls!: OrbitControls;

    private headPhoneWithStand?: THREE.Group<THREE.Object3DEventMap>;
    private commodore64ComputerModel?: THREE.Group<THREE.Object3DEventMap>;
    private gameboyClassicModel?: THREE.Group<THREE.Object3DEventMap>;
    private childhoodBooksModel?: THREE.Group<THREE.Object3DEventMap>;
    private clipboard?: THREE.Group<THREE.Object3DEventMap>;

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
        const near = 2;
        const far = 30;

        // ## Initalising the camera
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // Anything inside the defined frustum will be drawn. Anything outside will not.
        this.camera.position.set(0, 3, 11); // Camera Coordinate System --> left-handed (index finger => x, thumb => y, middle finger => z)

        // # Setting up the scene
        this.scene = new THREE.Scene();

        // # Load gltf models
        const baseUrl = assetsPath.gltfModels;

        let modelName = `headphone_with_stand.glb`;
        let component: WorkstationComponent = this;
        const gltfLoader = new GLTFLoader();
        let url = `${baseUrl}/${modelName}`;
        gltfLoader.load(url, async (gltf) => {
            component.headPhoneWithStand = gltf.scene;
            component.headPhoneWithStand.scale.set(7, 7, 7);
            component.headPhoneWithStand.position.x = -6.5;
            component.headPhoneWithStand.position.y = -0.75;
            component.headPhoneWithStand.position.z = -1.25;
            component.headPhoneWithStand.rotation.y += (Math.PI / 4);

            // wait until the model can be added to the scene without blocking due to shader compilation
            await component.renderer.compileAsync(component.headPhoneWithStand, component.camera, component.scene);
            component.scene.add(component.headPhoneWithStand);
        });

        modelName = `commodore_64__computer_full_pack.glb`;
        url = `${baseUrl}/${modelName}`;
        gltfLoader.load(url, async (gltf) => {
            component.commodore64ComputerModel = gltf.scene;
            component.commodore64ComputerModel.position.x = 1;
            component.commodore64ComputerModel.position.y = -0.75;
            component.commodore64ComputerModel.position.z = 0.5;

            // wait until the model can be added to the scene without blocking due to shader compilation
            await component.renderer.compileAsync(component.commodore64ComputerModel, component.camera, component.scene);
            component.scene.add(component.commodore64ComputerModel);
        });

        modelName = `game_boy_classic.glb`;
        url = `${baseUrl}/${modelName}`;
        gltfLoader.load(url, async (gltf) => {
            component.gameboyClassicModel = gltf.scene;
            component.gameboyClassicModel.scale.set(7, 7, 7);
            component.gameboyClassicModel.rotation.y -= (Math.PI / 4);
            component.gameboyClassicModel.rotation.z += (Math.PI / 2);
            component.gameboyClassicModel.position.x = -5;
            component.gameboyClassicModel.position.y = -0.5;
            component.gameboyClassicModel.position.z = 4;

            // wait until the model can be added to the scene without blocking due to shader compilation
            await component.renderer.compileAsync(component.gameboyClassicModel, component.camera, component.scene);
            component.scene.add(component.gameboyClassicModel);
        });

        modelName = `childhood_books.glb`;
        url = `${baseUrl}/${modelName}`;
        gltfLoader.load(url, async (gltf) => {
            component.childhoodBooksModel = gltf.scene;
            component.childhoodBooksModel.scale.set(8, 8, 8);
            component.childhoodBooksModel.rotation.y -= 4 * Math.PI / 6;
            component.childhoodBooksModel.position.x = 8;
            component.childhoodBooksModel.position.y = -0.65;
            component.childhoodBooksModel.position.z = -2;

            // wait until the model can be added to the scene without blocking due to shader compilation
            await component.renderer.compileAsync(component.childhoodBooksModel, component.camera, component.scene);
            component.scene.add(component.childhoodBooksModel);
        });

        modelName = `clipboard.glb`;
        url = `${baseUrl}/${modelName}`;
        gltfLoader.load(url, async (gltf) => {
            component.clipboard = gltf.scene;
            component.clipboard.scale.set(10, 10, 10);
            component.clipboard.rotation.y -= Math.PI / 6;
            component.clipboard.position.x = 8.2;
            component.clipboard.position.y = -0.65;
            component.clipboard.position.z = 3.5;

            // wait until the model can be added to the scene without blocking due to shader compilation
            await component.renderer.compileAsync(component.clipboard, component.camera, component.scene);
            component.scene.add(component.clipboard);
        });

        // # Create a desk and add it to the scene

        // ## Geometry
        const boxWidth = 20;
        const boxHeight = 0.25;
        const boxDepth = 12;
        const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        // ## Material
        const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x331a00 });

        // ## Mesh
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.x = 0.5;
        box.position.y = -0.85;

        // ## Add box to the scene
        this.scene.add(box);

        // # Creating light
        const color = 0xFFFFFF;
        const intensity = 250;
        const lightPos = 5;

        const light = new THREE.PointLight(color, intensity);
        light.position.set(0, lightPos, lightPos);

        // ## Add light to the scene
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
        this.renderer.setAnimationLoop(() => this.animate(component));
    }

    private animate(component: WorkstationComponent): void {
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
