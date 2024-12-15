import { AfterViewInit, Component, ElementRef, NgZone, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NOJI_LOGO } from 'assets/assets.constants';
import { GsapAnimationService } from '../services/gsap-animation.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements AfterViewInit {
    readonly NOJI_LOGO = NOJI_LOGO;
    isSelected = false;

    private isSelectedSubject = new Subject<boolean>();

    @ViewChildren('dropDownOptionContainerRef', { read: ElementRef })
    private dropDownOptionContainerRef!: QueryList<ElementRef>;

    constructor(
        private zone: NgZone,
        private gsapAnimationService: GsapAnimationService
    ) { }

    ngAfterViewInit(): void {
        this.dropDownOptionContainerRef.changes.subscribe((dropDownOptionContainer: QueryList<ElementRef>) => {
            if (dropDownOptionContainer.length > 0 && this.isSelected) {
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

        if (!!this.dropDownOptionContainerRef) {
            this.isSelectedSubject.subscribe((isSelected) => {
                this.zone.runOutsideAngular(() => {
                    this.gsapAnimationService.gsap.to(`#${this.dropDownOptionContainerRef.first.nativeElement.id}`, {
                        opacity: 0,
                        skewY: '30deg',
                        y: -100,
                        duration: 1,
                        ease: "back.inOut(4)"
                    }).then(() => {
                        this.zone.run(() => this.isSelected = isSelected)
                    });
                });
            });
        }
    }

    onDropdownMenuClick(): void {
        if (!this.isSelected) {
            this.isSelected = true;
        } else {
            this.isSelectedSubject.next(false);
        }
    }

    onLogoNameOccupationClick(): void {
        window.scroll({ top: 0, left: 0 });
    }
}
