import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionWrapperComponent } from './components/section-wrapper.component';
import { CardPrimaryWrapperComponent } from './components/card-primary-wrapper.component';



@NgModule({
  declarations: [
    SectionWrapperComponent,
    CardPrimaryWrapperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SectionWrapperComponent,
    CardPrimaryWrapperComponent
  ]
})
export class SharedModule { }
