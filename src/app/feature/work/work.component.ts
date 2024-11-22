import { Component } from '@angular/core';
import { Experience } from './experience';
import { workExperiences } from './data/work-experience-data';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss'
})
export class WorkComponent {
    private readonly experiences = workExperiences;

    getExperiences(): Experience[] {
        return this.experiences;
    }
}
