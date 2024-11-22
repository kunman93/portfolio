import { Component, Input } from '@angular/core';
import { Project } from '../models/project';

@Component({
  selector: 'app-project-section',
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.scss'
})
export class ProjectSectionComponent {
    @Input() project!: Project;
}
