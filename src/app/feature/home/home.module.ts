import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { WorkstationComponent } from './workstation.component';
import { SharedModule } from "../../shared/shared.module";




@NgModule({
    declarations: [
        HomeComponent,
        WorkstationComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        HomeComponent,
    ]
})
export class HomeModule { }
