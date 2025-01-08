import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export abstract class ThreejsBaseComponent {
    // --- Helper properties ----
    protected renderer!: THREE.WebGLRenderer;
    protected camera!: THREE.PerspectiveCamera;
    protected scene!: THREE.Scene;
    protected controls!: OrbitControls;

    abstract createScene(): void

    protected initOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.05; // The damping inertia used, default is 0.05

        this.controls.screenSpacePanning = false;
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.target.set(0, 0, 0); // The focus point of the controls

        this.controls.maxPolarAngle = Math.PI; // How far you can orbit vertically, upper limit. Range is 0 to Math.PI radians, and default is Math.PI. 
    }

    protected animate(component: ThreejsBaseComponent, animationFn?: () => void) {
        component.onWindowResize(component);
        if (animationFn) {
            animationFn();
        }
        component.controls.update();
        component.renderer.render(component.scene, component.camera);
    }

    private onWindowResize(component: ThreejsBaseComponent): void {
        if (component.resizeRendererToDisplaySize(component)) {
            const canvas = component.renderer.domElement;
            component.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            component.camera.updateProjectionMatrix();
        }
    }

    private resizeRendererToDisplaySize(component: ThreejsBaseComponent): boolean {
        const canvas = component.renderer.domElement;
        const pixelRatio = window.devicePixelRatio; // for handling HD-DPI
        const width = Math.floor(canvas.clientWidth * pixelRatio);
        const height = Math.floor(canvas.clientHeight * pixelRatio);
        const needResize = canvas.width !== width || canvas.height !== height;

        if (needResize) {
            component.renderer.setSize(width, height, false); // Setting updateStyle to false prevents any style changes to the output canvas. 
        }

        return needResize;
    }
}
