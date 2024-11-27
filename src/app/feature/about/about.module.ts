import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about.component';
import { CardComponent } from './components/card.component';




@NgModule({
    declarations: [
        AboutComponent,
        CardComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AboutComponent,
    ]
})
export class AboutModule { }
