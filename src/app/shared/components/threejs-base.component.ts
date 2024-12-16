import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export abstract class ThreejsBaseComponent {
    // --- Helper properties ----
    protected renderer!: THREE.WebGLRenderer;
    protected camera!: THREE.PerspectiveCamera;
    protected scene!: THREE.Scene;
    protected controls!: OrbitControls;

    abstract createScene(): void

    protected animate(component: ThreejsBaseComponent, animationFn?: () => void) {
        component.onWindowResize(component);
        if (!!animationFn) {
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
