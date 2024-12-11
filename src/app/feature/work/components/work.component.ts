import { AfterViewInit, Component, NgZone } from '@angular/core';
import { academicHistory } from '../data/academic-history-data';
import { workHistory } from '../data/work-history-data';
import { GsapAnimationService } from 'src/app/core/services/gsap-animation.service';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss'
})
export class WorkComponent implements AfterViewInit {
    readonly workHistory = workHistory;
    readonly academicHistory = academicHistory;

    constructor(
        private zone: NgZone,
        private gsapAnimationService: GsapAnimationService
    ) { }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            this.animateExperienceSection();
        });
    }

    private animateExperienceSection(): void {
        this.gsapAnimationService.animateSmallTitleAndTitle(
            "#experienceSmallTitle, #experienceTitle",
            "#workExperience #timelineContainer"
        );

        this.workHistory.forEach((_value, idx) => {
            // ---- Mobile ----
            this.gsapAnimationService.animateTimelineIcon(
                `#workExperience #logoContainerMobile${idx}`,
                `#workExperience #logoContainerMobile${idx}`
            );

            this.gsapAnimationService.animateExperienceCard(
                `#workExperience #experienceCardMobile${idx}`,
                `#workExperience #logoContainerMobile${idx}`,
                100
            );

            this.gsapAnimationService.animateWorkingPeriod(
                `#workExperience #workingPeriodMobile${idx}`,
                `#workExperience #workingPeriodMobile${idx}`,
                100
            );

            // ---- Desktop ----
            this.gsapAnimationService.animateTimelineIcon(
                `#workExperience #logoContainerDesktop${idx}`,
                `#workExperience #logoContainerDesktop${idx}`
            );

            this.gsapAnimationService.animateExperienceCard(
                `#workExperience #experienceCardDesktop${idx}`,
                `#workExperience #logoContainerDesktop${idx}`,
                idx % 2 === 0 ? -100 : 100
            );

            this.gsapAnimationService.animateWorkingPeriod(
                `#workExperience #workingPeriodDesktop${idx}`,
                `#workExperience #workingPeriodDesktop${idx}`,
                idx % 2 === 0 ? 100 : -100
            );
        });

        this.gsapAnimationService.gsap.from("app-employment-reference", {
            opacity: 0,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: "app-employment-reference",
                endTrigger: "#academicHistory",
                scrub: 4,
                end: "top 100%"
            }
        });
    }
}
