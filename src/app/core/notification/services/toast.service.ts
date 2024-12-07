import { Injectable } from '@angular/core';
import { ToastData } from '../models/toast-data';
import { TOASTER_CONFIG } from 'src/app/configs/toaster.config';
import { TimerService } from 'src/app/shared/services/timer.service';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private toastDatas: ToastData[] = [];
    private timerService = new TimerService(() => this.remove(0), TOASTER_CONFIG.DURATION);

    add(toastData: ToastData): void {
        this.toastDatas.push(toastData);
        this.timerService.reset();

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