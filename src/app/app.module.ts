import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FeatureModule } from "./feature/feature.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    FeatureModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
