import { AfterViewInit, Component, NgZone } from '@angular/core';
import { GsapAnimationService } from 'src/app/core/services/gsap-animation.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {

    constructor(
        private zone: NgZone,
        private gsapAnimationService: GsapAnimationService
    ) { }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            this.gsapAnimationService.animatePlanetEarth(
                "app-planet-earth",
                "app-planet-earth",
                200
            );

            this.gsapAnimationService.animateContactEditor(
                "app-contact-editor",
                "app-contact-editor",
                -200
            );
        });
    }
}
