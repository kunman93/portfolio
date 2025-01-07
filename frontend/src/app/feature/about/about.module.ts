import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about.component';
import { ServiceCardComponent } from './components/service-card.component';
import { SharedModule } from "../../shared/shared.module";




@NgModule({
    declarations: [
        AboutComponent,
        ServiceCardComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        AboutComponent,
    ]
})
export class AboutModule { }
