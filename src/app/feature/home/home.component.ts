import { AfterViewInit, Component, NgZone } from '@angular/core';
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
    constructor(private zone: NgZone) { }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            gsap.registerPlugin(ScrollTrigger);

            // -- Home Section --
            gsap.from("app-nav-bar, #homeTitle, #homeDescription, app-workstation", {
                opacity: 0,
                duration: 2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: "app-home"
                }
            });
        })
    }

}
