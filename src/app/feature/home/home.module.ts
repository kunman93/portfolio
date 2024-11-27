import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { WorkstationComponent } from './workstation.component';




@NgModule({
    declarations: [
        HomeComponent,
        WorkstationComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HomeComponent,
    ]
})
export class HomeModule { }
