import { Injectable } from "@angular/core";
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Injectable({
  providedIn: 'root',
})
export class GsapAnimationService {
    constructor() {
        gsap.registerPlugin(ScrollTrigger);
    }

    public animateSmallTitleAndTitle(
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

    public animateTimelineIcon(
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

    get gsap(): globalThis.GSAP {
        return gsap;
    }
}