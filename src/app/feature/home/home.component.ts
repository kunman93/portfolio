import { AfterViewInit, Component, NgZone } from '@angular/core';
import { GsapAnimationService } from 'src/app/core/services/gsap-animation.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

    constructor(
        private zone: NgZone,
        private gsapAnimationService: GsapAnimationService
    ) { }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            this.gsapAnimationService.gsap.from("app-nav-bar, #homeTitle, #homeDescription, app-workstation", {
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
