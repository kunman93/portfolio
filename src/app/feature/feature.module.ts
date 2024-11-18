import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { WorkComponent } from './work/work.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    AboutComponent,
    WorkComponent,
    ContactComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AboutComponent,
    WorkComponent,
    ContactComponent
  ]
})
export class FeatureModule { }
