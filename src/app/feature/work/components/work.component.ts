import { Component } from '@angular/core';
import { workExperiences } from '../data/work-experience-data';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss'
})
export class WorkComponent {
    readonly workExperience = workExperiences;
}
