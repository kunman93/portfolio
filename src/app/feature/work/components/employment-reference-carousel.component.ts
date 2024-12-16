import { Component, NgZone, OnInit } from '@angular/core';
import { employmentReferences } from '../data/employment-reference-data';
import { EmploymentReference } from '../models/employment-reference';
import { GsapAnimationService } from 'src/app/core/services/gsap-animation.service';

@Component({
    selector: 'app-employment-reference-carousel',
    templateUrl: './employment-reference-carousel.component.html',
    styleUrl: './employment-reference-carousel.component.scss'
})
export class EmploymentReferenceCarouselComponent implements OnInit {
    readonly employmentReferences = employmentReferences;
    currentIndex = 0;
    currentEmploymentReference!: EmploymentReference;
    isButtonDisabled = false;

    private readonly ANIMATION_TRANSITION = 800;
    private readonly ANIMATION_SKEW_X = '20deg';
    private readonly ANIMATION_NEGATIVE_SKEW_X = '-20deg';
    private readonly ANIMATION_DURATION_IN_SECONDS = 1.5;

    constructor(
        private zone: NgZone,
        private gsapAnimationService: GsapAnimationService
    ) { }

    ngOnInit(): void {
        this.currentEmploymentReference = employmentReferences[this.currentIndex];
    }

    onPrevClick(): void {
        this.animateEmploymentReferenceCard(this.ANIMATION_TRANSITION, this.ANIMATION_NEGATIVE_SKEW_X);
        this.currentIndex = this.currentIndex > 0
            ? this.currentIndex - 1
            : this.employmentReferences.length - 1;
    }

    onNextClick(): void {
        this.animateEmploymentReferenceCard(-this.ANIMATION_TRANSITION, this.ANIMATION_SKEW_X);
        this.currentIndex = this.currentIndex < this.employmentReferences.length - 1
            ? this.currentIndex + 1
            : 0;
    }

    onSelectedClick(index: number): void {
        if (this.currentIndex === index) {
            return;
        } else if (this.currentIndex > index) {
            this.animateEmploymentReferenceCard(this.ANIMATION_TRANSITION, this.ANIMATION_NEGATIVE_SKEW_X);
        } else {
            this.animateEmploymentReferenceCard(-this.ANIMATION_TRANSITION, this.ANIMATION_SKEW_X);
        }
        this.currentIndex = index;
    }

    private animateEmploymentReferenceCard(x: number, skewX: string): void {
        this.isButtonDisabled = true;
        this.zone.runOutsideAngular(() => {
            this.gsapAnimationService.gsap.from("#employmentReferenceCardContainer", {
                opacity: 0,
                skewX,
                x,
                duration: this.ANIMATION_DURATION_IN_SECONDS,
                ease: "back.out(2.5)"
            }).then(() => this.zone.run(() => this.isButtonDisabled = false));
        });
    }
}
