import { Component, Input } from '@angular/core';
import { Experience } from './experience';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss'
})
export class ExperienceCardComponent {
    @Input() experience?: Experience;
}
