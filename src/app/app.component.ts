import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { ToastService } from './core/notification/services/toast.service';
import { ToastData } from './core/notification/models/toast-data';
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
    toastDatas!: ToastData[];

    constructor(
        viewport: ViewportScroller,
        private toastService: ToastService,
        private zone: NgZone
    ) {
        viewport.setOffset([0, 50]);
    }

    ngOnInit(): void {
        this.toastDatas = this.toastService.getToastDatas();
    }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            gsap.registerPlugin(ScrollTrigger);
            
            // -- Home Section --
            gsap.from("app-nav-bar, #homeTitle, #homeDescription, app-workstation", {
                opacity: 0,
                duration: 2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: "app-home"
                }
            });

            // -- About Section --
            gsap.from("#overviewSmallTitle, #overviewTitle", {
                opacity: 0,
                y: -100,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: "app-about #overviewText",
                    end: "top 100%",
                    scrub: 4,
                }
            });

            gsap.from("#overviewText", {
                opacity: 0,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: "app-about app-service-card",
                    end: "top 100%",
                    scrub: 4
                }
            });

            gsap.from("app-service-card", {
                opacity: 0,
                x: -100,
                ease: "power2.inOut",
                stagger: {
                    amount: 2
                },
                scrollTrigger: {
                    trigger: "app-work",
                    scrub: 4,
                    end: "top 100%"
                }
            });
        });
    }
}
