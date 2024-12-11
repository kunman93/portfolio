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
            this.gsapAnimationService.animateSmallTitleAndTitle(
                "#experienceSmallTitle, #experienceTitle",
                "#workExperience #timelineContainer"
            );

            for (const idx in workHistory) {
                // ---- Mobile ----
                this.gsapAnimationService.animateTimelineIcon(
                    `#workExperience #logoContainerMobile${idx}`,
                    `#workExperience #logoContainerMobile${idx}`
                );

                // ---- Desktop ----
                this.gsapAnimationService.animateTimelineIcon(
                    `#workExperience #logoContainerDesktop${idx}`,
                    `#workExperience #logoContainerDesktop${idx}`
                );
            }
        });
    }
}
