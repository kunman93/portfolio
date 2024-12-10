import { ViewportScroller } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { ToastService } from './core/notification/services/toast.service';
import { ToastData } from './core/notification/models/toast-data';
import { gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
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
        this.zone.runOutsideAngular(() => {
            gsap.registerPlugin(ScrollTrigger);
            
            // -- Home Section --
            gsap.from("app-nav-bar, #homeTitle, #homeDescription", {
                opacity: 0,
                duration: 2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: "app-home",
                    markers: true
                }
            });
        });
    }
}
