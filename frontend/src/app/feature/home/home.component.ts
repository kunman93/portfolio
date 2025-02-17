import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { GsapAnimationService } from 'src/app/core/services/gsap-animation.service';
import { Image } from 'shared/models/image';
import { BACKGROUNDS } from 'assets/assets.constants';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
    private readonly TYPEWRITER_TEXTS: string[] = [
        "Welcome to my portfolio.",
        "I'm a Full-Stack Software Engineer.",
        "Scroll down to learn more about me."
    ];

    readonly backgroundImage: Image = {
        srcImage: BACKGROUNDS.tree,
        alt: "tree background"
    };

    @ViewChild('animatedTextRef')
    private animatedTextRef!: ElementRef;

    constructor(
        private zone: NgZone,
        private gsapAnimationService: GsapAnimationService
    ) { }

    ngAfterViewInit(): void {
        this.animateHomeSection();
    }

    private animateHomeSection() {
        this.zone.runOutsideAngular(() => {
            const tlHomeSection = this.gsapAnimationService.gsap.timeline();
            tlHomeSection
                .from("app-nav-bar, #homeTitle, #homeDescription", {
                    opacity: 0,
                    duration: 2,
                    ease: "power2.inOut"
                })
                .from("#backgroundImage", {
                    opacity: 0,
                    duration: 2,
                    ease: "power2.inOut"
                }, "-=50%")
                .from("app-workstation", {
                    opacity: 0,
                    duration: 2,
                    ease: "power2.inOut"
                }, "-=50%")
                .to("#cursor", {
                    opacity: 0,
                    repeat: -1,
                    yoyo: true,
                    duration: 0.5,
                    ease: "power2.inOut"
                });

            const tlMaster = this.gsapAnimationService.gsap.timeline({ repeat: -1 });
            this.TYPEWRITER_TEXTS.forEach((text) => {
                const tlText = this.gsapAnimationService.gsap.timeline({ repeat: 1, yoyo: true });
                tlText.to(`#${this.animatedTextRef.nativeElement.id}`, {
                    duration: 2,
                    text,
                });
                tlMaster.add(tlText);
            });

            tlHomeSection.add(tlMaster);
        });
    }
}
