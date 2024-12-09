import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ThreejsEngineComponent } from 'src/app/core/engine/threejs-engine.component';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Component({
    selector: 'app-universe',
    templateUrl: './universe.component.html',
    styleUrl: './universe.component.scss'
})
export class UniverseComponent extends ThreejsEngineComponent implements AfterViewInit {
    @ViewChild('canvasUniverse')
    private canvasRef!: ElementRef;

    private readonly NUMBER_OF_STARS = 2500;
    private readonly COLOR = '#ffff00';

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
        const near = 1;
        const far = 1000;

        // ## Initalising the camera
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // Anything inside the defined frustum will be drawn. Anything outside will not.
        this.camera.position.set(0, 0, 600); // Camera Coordinate System --> left-handed (index finger => x, thumb => y, middle finger => z)

        // # Setting up the scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x00061a, 0.0002);

        // # Creating stars
        const vertices = [];
        for (let i = 0; i < this.NUMBER_OF_STARS; i++) {
            const x = (Math.random() - 0.5) * 1000;
            const y = (Math.random() - 0.5) * 1000;
            const z = (Math.random() - 0.5) * 1000;
            vertices.push(x, y, z);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({ size: 1, color: this.COLOR, sizeAttenuation: true });

        const stars = new THREE.Points(geometry, material);
        this.scene.add(stars);

        // # Add OrbitControl
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.listenToKeyEvents(window); // optional

        // controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.05; // The damping inertia used, default is 0.05
        this.controls.autoRotateSpeed = 0.75;
        this.controls.autoRotate = true;

        this.controls.screenSpacePanning = false;
        this.controls.enableZoom = false;
        this.controls.target.set(0, 0, 0); // The focus point of the controls

        this.controls.maxPolarAngle = Math.PI; // How far you can orbit vertically, upper limit. Range is 0 to Math.PI radians, and default is Math.PI. 
        // # Set an animation loop on the renderer
        // ## The function will be called every available frame.
        this.renderer.setAnimationLoop(() => this.animate(this));
    }
}
