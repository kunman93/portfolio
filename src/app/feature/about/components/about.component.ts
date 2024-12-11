import { AfterViewInit, Component, NgZone } from '@angular/core';
import { Service } from '../models/service';
import { service } from '../data/service-data';
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
    readonly services: Service[] = service;

    constructor(private zone: NgZone) { }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            gsap.registerPlugin(ScrollTrigger);

            // -- About Section --
            this.animateSmallTitleAndTitle(
                "#overviewSmallTitle, #overviewTitle",
                "app-about #overviewText"
            );

            gsap.from("#overviewText", {
                opacity: 0,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: "app-about app-service-card",
                    end: "top 100%",
                    scrub: 4
                }
            });

            gsap.from("app-service-card", {
                opacity: 0,
                x: -100,
                ease: "power2.inOut",
                stagger: {
                    each: 1
                },
                scrollTrigger: {
                    trigger: "app-work",
                    scrub: 4,
                    end: "top 100%"
                }
            });
        });
    }

    private animateSmallTitleAndTitle(
        target: string, 
        trigger: string
    ): void {
        gsap.from(target, {
            opacity: 0,
            y: -100,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: trigger,
                end: "top 100%",
                scrub: 4
            }
        });
    }
}
