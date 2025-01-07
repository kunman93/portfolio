import { Component, Input } from '@angular/core';
import { ToastData } from '../models/toast-data';
import { ToastType } from '../models/toast-type';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
    readonly toastType = ToastType;
    @Input() toastData!: ToastData;

    constructor(private toastService: ToastService) {
    }

    onCloseButtonClick(){
        this.toastService.remove(0);
    }
}
