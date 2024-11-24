import { Component } from '@angular/core';
import { History } from '../models/history';
import { assetsPath, workExperiences } from '../data/work-experience-data';

@Component({
    selector: 'app-work-experience',
    templateUrl: './work-experience.component.html',
    styleUrl: './work-experience.component.scss'
})
export class WorkExperienceComponent {
    readonly assetsPath = assetsPath;
    private readonly experiences = workExperiences;

    getExperiences(): History[] {
        return this.experiences;
    }
}
