import { Component, Input } from '@angular/core';
import { Project } from '../models/project';

@Component({
  selector: 'app-experience-card-project-section',
  templateUrl: './experience-card-project-section.component.html',
  styleUrl: './experience-card-project-section.component.scss'
})
export class ExperienceCardProjectSectionComponent {
    @Input() project!: Project;
}
