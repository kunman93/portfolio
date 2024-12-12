import { AfterViewInit, Component, NgZone } from '@angular/core';
import { academicHistory } from '../data/academic-history-data';
import { workHistory } from '../data/work-history-data';
import { History } from "../models/history";
import { GsapAnimationService } from 'src/app/core/services/gsap-animation.service';
import { technologies } from '../data/technologies';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss'
})
export class WorkComponent implements AfterViewInit {
    readonly workHistory = workHistory;
    readonly academicHistory = academicHistory;
    private readonly technologies = technologies;

    constructor(
        private zone: NgZone,
        private gsapAnimationService: GsapAnimationService
    ) { }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            this.animateExperienceSection();
            this.animateAcademicHistorySection();
            this.animateSkillsSection();
            this.animateProjectsSection();
        });
    }

    private animateExperienceSection(): void {
        this.animateWorkExperienceOrAcademicHistorySection("#workExperience", this.workHistory);

        this.gsapAnimationService.gsap.from("app-employment-reference", {
            opacity: 0,
            scale: 0.8,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: "app-employment-reference",
                endTrigger: "#academicHistory",
                scrub: 4,
                end: "top 100%"
            }
        });
    }

    private animateAcademicHistorySection(): void {
        this.animateWorkExperienceOrAcademicHistorySection("#academicHistory", this.academicHistory);
    }

    private animateWorkExperienceOrAcademicHistorySection(sectionId: string, history: History[]) {
        this.gsapAnimationService.animateSmallTitleAndTitle(
            `${sectionId} #experienceSmallTitle, ${sectionId} #experienceTitle`,
            `${sectionId} #timelineContainer`
        );

        history.forEach((_value, idx) => {
            // ---- Mobile ----
            this.gsapAnimationService.animateTimelineIcon(
                `${sectionId} #logoContainerMobile${idx}`,
                `${sectionId} #logoContainerMobile${idx}`
            );

            this.gsapAnimationService.animateExperienceCard(
                `${sectionId} #experienceCardMobile${idx}`,
                `${sectionId} #logoContainerMobile${idx}`,
                100
            );

            this.gsapAnimationService.animateWorkingPeriod(
                `${sectionId} #workingPeriodMobile${idx}`,
                `${sectionId} #workingPeriodMobile${idx}`,
                100
            );

            // ---- Desktop ----
            this.gsapAnimationService.animateTimelineIcon(
                `${sectionId} #logoContainerDesktop${idx}`,
                `${sectionId} #logoContainerDesktop${idx}`
            );

            this.gsapAnimationService.animateExperienceCard(
                `${sectionId} #experienceCardDesktop${idx}`,
                `${sectionId} #logoContainerDesktop${idx}`,
                idx % 2 === 0 ? -100 : 100
            );

            this.gsapAnimationService.animateWorkingPeriod(
                `${sectionId} #workingPeriodDesktop${idx}`,
                `${sectionId} #workingPeriodDesktop${idx}`,
                idx % 2 === 0 ? 100 : -100
            );
        });
    }

    private animateSkillsSection(): void {
        this.gsapAnimationService.animateSmallTitleAndTitle(
            `app-skills #skillsSmallTitle, app-skills #skillsTitle`,
            `app-skills #technologyOrbsContainer`
        );

        this.technologies.forEach((_value, idx) => {
            this.gsapAnimationService.gsap.from(`app-skills #technologyOrb${idx}`, {
                opacity: 0,
                scale: 0.5,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: `app-skills #technologyOrb${idx}`,
                    scrub: 4,
                    end: "top 50%"
                }
            });
        });
    }

    private animateProjectsSection(): void {
        this.gsapAnimationService.animateSmallTitleAndTitle(
            "#projectsSmallTitle, #projectsTitle",
            "app-project #projectsText"
        );

        this.gsapAnimationService.gsap.from("#projectsText", {
            opacity: 0,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: "app-project #projectsContainer",
                end: "top 100%",
                scrub: 4
            }
        });

        this.gsapAnimationService.gsap.from("#projectsContainer", {
            opacity: 0,
            scale: 0.8,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: "#projectsContainer",
                end: "top 50%",
                scrub: 4
            }
        });
    }
}
