import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceCardComponent } from './components/experience-card.component';
import { ExperienceComponent } from './components/experience.component';
import { ProjectSectionComponent } from './components/project-section.component';
import { TaskSectionComponent } from './components/task-section.component';
import { TechnologyOrbComponent } from './components/technology-orb.component';
import { WorkComponent } from './components/work.component';
import { SharedModule } from "../../shared/shared.module";




@NgModule({
    declarations: [
        ExperienceComponent,
        ExperienceCardComponent,
        ProjectSectionComponent,
        TaskSectionComponent,
        WorkComponent,
        TechnologyOrbComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        WorkComponent,
    ]
})
export class WorkModule { }
