import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TOASTER_CONFIG } from 'src/app/configs/toaster.config';
import { ToastService } from './core/notification/services/toast.service';
import { ToastData } from './core/notification/models/toast-data';
import { GsapAnimationService } from './core/services/gsap-animation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
    toastDatas!: ToastData[];

    @ViewChildren('toastRef', { read: ElementRef })
    private toastsRef!: QueryList<ElementRef>;

    constructor(
        viewport: ViewportScroller,
        private toastService: ToastService,
        private zone: NgZone,
        private gsapAnimationService: GsapAnimationService
    ) {
        viewport.setOffset([0, 50]);
    }

    ngOnInit(): void {
        this.toastDatas = this.toastService.getToastDatas();
    }

    ngAfterViewInit(): void {
        this.animateToast();
    }

    private animateToast(): void {
        this.toastsRef.changes.subscribe((toasts: QueryList<ElementRef>) => {
            if (toasts.length > 0) {
                this.zone.runOutsideAngular(() => {
                    const toastId = `#${toasts.first.nativeElement.id}`;

                    const tweenParamsFrom = {
                        opacity: 0,
                        x: 100,
                        duration: TOASTER_CONFIG.SLIDE_IN_OUT_DURATION,
                        ease: "back.inOut(4)"
                    };

                    const tweenParamsTo = {
                        opacity: tweenParamsFrom.opacity,
                        x: tweenParamsFrom.x,
                        duration: tweenParamsFrom.duration,
                        ease: tweenParamsFrom.ease
                    };

                    const tl = this.gsapAnimationService.gsap.timeline();
                    tl
                        .from(
                            toastId,
                            tweenParamsFrom
                        )
                        .to(
                            `${toastId} #progressBar`,
                            {
                                width: '0%',
                                duration: TOASTER_CONFIG.PROGRESS_BAR_DURATION,
                            }
                        )
                        .to(
                            toastId,
                            tweenParamsTo
                        );
                });
            }
        });
    }
}
