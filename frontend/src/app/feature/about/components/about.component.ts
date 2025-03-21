import { AfterViewInit, Component, NgZone } from '@angular/core';
import { Service } from '../models/service';
import { service } from '../data/service-data';
import { GsapAnimationService } from 'src/app/core/services/gsap-animation.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
    readonly services: Service[] = service;

    constructor(
        private zone: NgZone,
        private gsapAnimationService: GsapAnimationService
    ) { }

    ngAfterViewInit(): void {
        this.animateAboutSection();
    }

    private animateAboutSection() {
        this.gsapAnimationService.animateSmallTitleAndTitle(
            "#overviewSmallTitle, #overviewTitle",
            "app-about #overviewText"
        );

        this.zone.runOutsideAngular(() => {
            this.gsapAnimationService.gsap.from("#overviewText", {
                opacity: 0,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: "app-about app-service-card",
                    end: "top 100%",
                    scrub: 4
                }
            });

            this.gsapAnimationService.gsap.from("app-service-card", {
                opacity: 0,
                x: -100,
                skewX: '40deg',
                ease: "back.inOut(3)",
                stagger: {
                    each: 1
                },
                scrollTrigger: {
                    trigger: "#overviewText",
                    endTrigger: "app-work",
                    scrub: 4,
                    end: "top 100%"
                }
            });
        });
    }
}
