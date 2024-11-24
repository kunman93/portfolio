import { Component } from '@angular/core';
import { Experience } from '../models/experience';
import { assetsPath, workExperiences } from '../data/work-experience-data';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss'
})
export class WorkComponent {
    readonly assetsPath = assetsPath;
    private readonly experiences = workExperiences;

    getExperiences(): Experience[] {
        return this.experiences;
    }
}
