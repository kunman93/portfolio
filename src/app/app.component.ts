import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastService } from './core/notification/services/toast.service';
import { ToastData } from './core/notification/models/toast-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    toastDatas!: ToastData[];

    constructor(
        viewport: ViewportScroller,
        private toastService: ToastService
    ) {
        viewport.setOffset([0, 50]);
    }

    ngOnInit(): void {
        this.toastDatas = this.toastService.getToastDatas();
    }
}
