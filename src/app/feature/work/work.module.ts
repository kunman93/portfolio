import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceCardComponent } from './components/experience-card.component';
import { ExperienceComponent } from './components/experience.component';
import { ProjectSectionComponent } from './components/project-section.component';
import { TaskSectionComponent } from './components/task-section.component';
import { TechnologyOrbComponent } from './components/technology-orb.component';
import { WorkComponent } from './components/work.component';




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
        CommonModule
    ],
    exports: [
        WorkComponent,
    ]
})
export class WorkModule { }
