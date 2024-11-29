import { Component  } from '@angular/core';
import { projects } from '../data/projects-data';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
    readonly projects = projects;
}
