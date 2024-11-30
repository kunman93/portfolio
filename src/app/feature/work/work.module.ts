import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling'; 
import { ExperienceCardComponent } from './components/experience-card.component';
import { ExperienceComponent } from './components/experience.component';
import { ExperienceCardProjectSectionComponent } from './components/experience-card-project-section.component';
import { ExperienceCardTaskSectionComponent } from './components/experience-card-task-section.component';
import { TechnologyOrbComponent } from './components/technology-orb.component';
import { WorkComponent } from './components/work.component';
import { SharedModule } from "../../shared/shared.module";
import { SkillsComponent } from './components/skills.component';
import { ProjectComponent } from './components/project.component';
import { ProjectCardComponent } from './components/project-card.component';




@NgModule({
    declarations: [
        ExperienceComponent,
        ExperienceCardComponent,
        ExperienceCardProjectSectionComponent,
        ExperienceCardTaskSectionComponent,
        WorkComponent,
        TechnologyOrbComponent,
        SkillsComponent,
        ProjectComponent,
        ProjectCardComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ScrollingModule
    ],
    exports: [
        WorkComponent,
    ]
})
export class WorkModule { }
