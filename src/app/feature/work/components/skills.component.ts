import { Component } from '@angular/core';
import { technologies } from '../data/technologies';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
    readonly technologies = technologies;
}
