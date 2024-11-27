import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionWrapperComponent } from './components/section-wrapper.component';



@NgModule({
  declarations: [
    SectionWrapperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SectionWrapperComponent
  ]
})
export class SharedModule { }
