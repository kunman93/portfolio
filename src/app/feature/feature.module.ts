import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/components/about.component';
import { ExperienceComponent } from './work/components/experience.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { WorkstationComponent } from './home/workstation.component';
import { CardComponent } from './about/components/card.component';
import { ExperienceCardComponent } from './work/components/experience-card.component';
import { ProjectSectionComponent } from './work/components/project-section.component';
import { TaskSectionComponent } from './work/components/task-section.component';
import { WorkComponent } from './work/components/work.component';



@NgModule({
    declarations: [
        HomeComponent,
        AboutComponent,
        ExperienceComponent,
        ContactComponent,
        WorkstationComponent,
        CardComponent,
        ExperienceCardComponent,
        ProjectSectionComponent,
        TaskSectionComponent,
        WorkComponent,
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
