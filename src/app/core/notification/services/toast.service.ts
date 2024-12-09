import { Injectable } from '@angular/core';
import { ToastData } from '../models/toast-data';
import { TOASTER_CONFIG } from 'src/app/configs/toaster.config';
import { Timer } from 'src/app/shared/utils/timer';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private toastDatas: ToastData[] = [];
    private timer = new Timer(() => this.remove(0), TOASTER_CONFIG.DURATION);

    add(toastData: ToastData): void {
        this.toastDatas.push(toastData);
        this.timer.reset();

        if (this.toastDatas.length > 1) {
            this.remove(0);
        }
    }

    remove(index: number) {
        this.toastDatas.splice(index, 1);
    }

    getToastDatas(): ToastData[] {
        return this.toastDatas;
    }
}