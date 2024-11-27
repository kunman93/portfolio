import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { HomeModule } from './home/home.module';
import { WorkModule } from './work/work.module';



@NgModule({
    imports: [
        CommonModule,
        HomeModule,
        AboutModule,
        WorkModule,
        ContactModule
    ],
    exports: [
        HomeModule,
        AboutModule,
        WorkModule,
        ContactModule
    ]
})
export class FeatureModule { }
