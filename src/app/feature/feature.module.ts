import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { WorkComponent } from './work/work.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { WorkstationComponent } from './home/workstation.component';
import { CardComponent } from './about/card.component';
import { ExperienceCardComponent } from './work/experience-card.component';
import { ProjectSectionComponent } from './work/project-section.component';
import { TaskSectionComponent } from './work/task-section.component';



@NgModule({
    declarations: [
        HomeComponent,
        AboutComponent,
        WorkComponent,
        ContactComponent,
        WorkstationComponent,
        CardComponent,
        ExperienceCardComponent,
        ProjectSectionComponent,
        TaskSectionComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HomeComponent,
        AboutComponent,
        WorkComponent,
        ContactComponent,
    ]
})
export class FeatureModule { }
