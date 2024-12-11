import { AfterViewInit, Component, NgZone } from '@angular/core';
import { academicHistory } from '../data/academic-history-data';
import { workHistory } from '../data/work-history-data';
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss'
})
export class WorkComponent implements AfterViewInit {
    readonly workHistory = workHistory;
    readonly academicHistory = academicHistory;

    constructor(private zone: NgZone) { }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            gsap.registerPlugin(ScrollTrigger);

            // -- Experience Section --
            this.animateSmallTitleAndTitle(
                "#experienceSmallTitle, #experienceTitle",
                "#workExperience #timelineContainer"
            );


            for (const idx in workHistory) {
                // ---- Mobile ----
                this.animateTimelineIcon(
                    `#workExperience #logoContainerMobile${idx}`,
                    `#workExperience #logoContainerMobile${idx}`
                );

                // ---- Desktop ----
                this.animateTimelineIcon(
                    `#workExperience #logoContainerDesktop${idx}`,
                    `#workExperience #logoContainerDesktop${idx}`
                );
            }
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

    private animateTimelineIcon(
        target: string,
        trigger: string,
    ): void {
        gsap.from(target, {
            opacity: 0,
            ease: "power2.inOut",
            stagger: {
                each: 1
            },
            scrollTrigger: {
                trigger,
                scrub: 4,
                end: "top 50%",
            }
        });
    }
}
