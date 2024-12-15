import { AfterViewInit, Component, ElementRef, NgZone, QueryList, ViewChildren } from '@angular/core';
import { NOJI_LOGO } from 'assets/assets.constants';
import { GsapAnimationService } from '../services/gsap-animation.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements AfterViewInit {
    readonly NOJI_LOGO = NOJI_LOGO;
    isSelected = false;

    @ViewChildren('dropDownOptionContainerRef', { read: ElementRef })
    private dropDownOptionContainerRef!: QueryList<ElementRef>;

    constructor(
        private zone: NgZone,
        private gsapAnimationService: GsapAnimationService
    ) { }

    ngAfterViewInit(): void {
        this.dropDownOptionContainerRef.changes.subscribe((dropDownOptionContainer: QueryList<ElementRef>) => {
            if (dropDownOptionContainer.length > 0) {
                this.zone.runOutsideAngular(() => {
                    this.gsapAnimationService.gsap.from(`#${dropDownOptionContainer.first.nativeElement.id}`, {
                        opacity: 0,
                        skewY: '30deg',
                        y: -100,
                        duration: 1,
                        ease: "back.inOut(4)"
                    });
                });
            }
        });
    }

    onDropdownMenuClick(): void {
        this.isSelected = !this.isSelected;
    }

    onLogoNameOccupationClick(): void {
        window.scroll({ top: 0, left: 0 });
    }
}
