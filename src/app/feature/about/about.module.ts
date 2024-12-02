import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about.component';
import { CardComponent } from './components/card.component';
import { SharedModule } from "../../shared/shared.module";




@NgModule({
    declarations: [
        AboutComponent,
        CardComponent
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
