import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './header/nav-bar.component';
import { CoreRoutingModule } from './core-routing.module';



@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }
