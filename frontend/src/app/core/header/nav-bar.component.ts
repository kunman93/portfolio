import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { NOJI_LOGO } from 'assets/assets.constants';
import { Image } from 'shared/models/image'
import { GsapAnimationService } from '../services/gsap-animation.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements AfterViewInit, OnDestroy {
    readonly logo: Image = {
        srcImage: NOJI_LOGO,
        alt: "Noji Logo"
    };

    isSelected = false;

    private isSelectedSubject$ = new Subject<boolean>();
    private unsubscribe$ = new Subject<void>();

    @ViewChildren('dropDownOptionContainerRef', { read: ElementRef })
    private dropDownOptionContainerRef!: QueryList<ElementRef>;

    constructor(
        private zone: NgZone,
        private gsapAnimationService: GsapAnimationService,
        private router: Router,
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

        if (this.dropDownOptionContainerRef) {
            this.isSelectedSubject$
                .pipe(
                    takeUntil(this.unsubscribe$)
                )
                .subscribe((isSelected) => {
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
            this.isSelectedSubject$.next(false);
        }
    }

    onLogoNameOccupationClick(): void {
        this.router.navigate(['/']);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
