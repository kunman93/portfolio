import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ASSET_PATHS, GLTF_MODELS } from 'assets/assets.constants';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { ThreejsBaseComponent } from 'src/app/shared/components/threejs-base.component';

@Component({
    selector: 'app-workstation',
    templateUrl: './workstation.component.html',
    styleUrl: './workstation.component.scss'
})
export class WorkstationComponent extends ThreejsBaseComponent implements AfterViewInit {
    @ViewChild('canvasWorkingStation')
    private canvasRef!: ElementRef;

    private headPhoneWithStand?: THREE.Group<THREE.Object3DEventMap>;
    private commodore64ComputerModel?: THREE.Group<THREE.Object3DEventMap>;
    private gameboyClassicModel?: THREE.Group<THREE.Object3DEventMap>;
    private childhoodBooksModel?: THREE.Group<THREE.Object3DEventMap>;
    private clipboard?: THREE.Group<THREE.Object3DEventMap>;

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
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(ASSET_PATHS.gltfModels);

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);
        gltfLoader.load(GLTF_MODELS.headphoneWithStand, async (gltf) => {
            this.headPhoneWithStand = gltf.scene;
            this.headPhoneWithStand.scale.set(7, 7, 7);
            this.headPhoneWithStand.position.x = -6.5;
            this.headPhoneWithStand.position.y = -0.75;
            this.headPhoneWithStand.position.z = -1.25;
            this.headPhoneWithStand.rotation.y += (Math.PI / 4);

            // wait until the model can be added to the scene without blocking due to shader compilation
            await this.renderer.compileAsync(this.headPhoneWithStand, this.camera, this.scene);
            this.scene.add(this.headPhoneWithStand);
        });

        gltfLoader.load(GLTF_MODELS.commodore64ComputerFullPack, async (gltf) => {
            this.commodore64ComputerModel = gltf.scene;
            this.commodore64ComputerModel.position.x = 0.5;
            this.commodore64ComputerModel.position.y = -0.75;
            this.commodore64ComputerModel.position.z = 0.5;

            // wait until the model can be added to the scene without blocking due to shader compilation
            await this.renderer.compileAsync(this.commodore64ComputerModel, this.camera, this.scene);
            this.scene.add(this.commodore64ComputerModel);
        });

        gltfLoader.load(GLTF_MODELS.gameBoyClassic, async (gltf) => {
            this.gameboyClassicModel = gltf.scene;
            this.gameboyClassicModel.scale.set(7, 7, 7);
            this.gameboyClassicModel.rotation.y -= (4 * Math.PI / 6);
            this.gameboyClassicModel.rotation.z += (Math.PI / 2);
            this.gameboyClassicModel.position.x = 6.0;
            this.gameboyClassicModel.position.y = -0.5;
            this.gameboyClassicModel.position.z = 5;

            // wait until the model can be added to the scene without blocking due to shader compilation
            await this.renderer.compileAsync(this.gameboyClassicModel, this.camera, this.scene);
            this.scene.add(this.gameboyClassicModel);
        });

        gltfLoader.load(GLTF_MODELS.childhoodBooks, async (gltf) => {
            this.childhoodBooksModel = gltf.scene;
            this.childhoodBooksModel.scale.set(8, 8, 8);
            this.childhoodBooksModel.rotation.y -= 4 * Math.PI / 6;
            this.childhoodBooksModel.position.x = 6.5;
            this.childhoodBooksModel.position.y = -0.65;
            this.childhoodBooksModel.position.z = -2;

            // wait until the model can be added to the scene without blocking due to shader compilation
            await this.renderer.compileAsync(this.childhoodBooksModel, this.camera, this.scene);
            this.scene.add(this.childhoodBooksModel);
        });

        gltfLoader.load(GLTF_MODELS.clipboard, async (gltf) => {
            this.clipboard = gltf.scene;
            this.clipboard.scale.set(10, 10, 10);
            this.clipboard.rotation.y += Math.PI / 6;
            this.clipboard.position.x = -5;
            this.clipboard.position.y = -0.65;
            this.clipboard.position.z = 3.5;

            // wait until the model can be added to the scene without blocking due to shader compilation
            await this.renderer.compileAsync(this.clipboard, this.camera, this.scene);
            this.scene.add(this.clipboard);
        });

        // # Create a desk and add it to the scene

        // ## Geometry
        const boxWidth = 17.5;
        const boxHeight = 0.25;
        const boxDepth = 12;
        const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        // ## Material
        const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x331a00 });

        // ## Mesh
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.x = 0.2;
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
        this.initOrbitControls();
       
        // # Set an animation loop on the renderer
        // ## The function will be called every available frame.
        this.renderer.setAnimationLoop(() => this.animate(this));
    }
}
