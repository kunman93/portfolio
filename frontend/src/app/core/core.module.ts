import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { NotificationModule } from './notification/notification.module';



@NgModule({
    imports: [
        CommonModule,
        HeaderModule,
        NotificationModule
    ],
    exports: [
        HeaderModule,
        NotificationModule
    ],
})
export class CoreModule { }
