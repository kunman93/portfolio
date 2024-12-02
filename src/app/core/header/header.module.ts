import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { HeaderRoutingModule } from './header-routing.module';



@NgModule({
    declarations: [
        NavBarComponent
    ],
    imports: [
        CommonModule,
        HeaderRoutingModule
    ],
    exports: [
        NavBarComponent
    ]
})
export class HeaderModule { }
