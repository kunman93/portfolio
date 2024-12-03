import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionWrapperComponent } from './components/section-wrapper.component';
import { CardPrimaryWrapperComponent } from './components/card-primary-wrapper.component';
import { CardSecondaryWrapperComponent } from './components/card-secondary-wrapper.component';



@NgModule({
  declarations: [
    SectionWrapperComponent,
    CardPrimaryWrapperComponent,
    CardSecondaryWrapperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SectionWrapperComponent,
    CardPrimaryWrapperComponent,
    CardSecondaryWrapperComponent
  ]
})
export class SharedModule { }
