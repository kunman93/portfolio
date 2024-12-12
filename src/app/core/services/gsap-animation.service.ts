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
        trigger: string
    ): void {
        gsap.from(target, {
            opacity: 0,
            scale: 0.5,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger,
                scrub: 4,
                end: "top 50%",
            }
        });
    }

    public animateExperienceCard(
        target: string,
        trigger: string,
        x: number
    ): void {
        this.animateHorizontalTransitionWithFadeIn(target, trigger, x);
    }

    public animateWorkingPeriod(
        target: string,
        trigger: string,
        x: number
    ): void {
        this.animateHorizontalTransitionWithFadeIn(target, trigger, x);
    }

    public animateContactEditor(
        target: string,
        trigger: string,
        x: number
    ): void {
        this.animateHorizontalTransitionWithFadeIn(target, trigger, x);
    }

    public animatePlanetEarth(
        target: string,
        trigger: string,
        x: number
    ): void {
        this.animateHorizontalTransitionWithFadeIn(target, trigger, x);
    }

    private animateHorizontalTransitionWithFadeIn(
        target: string,
        trigger: string,
        x: number
    ): void {
        gsap.from(target, {
            opacity: 0,
            x,
            ease: "back.inOut(4)",
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