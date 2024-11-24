import { Component, Input } from '@angular/core';
import { History } from '../models/history';
import { assetsPath } from '../data/work-experience-data';

@Component({
    selector: 'app-work-experience',
    templateUrl: './work-experience.component.html',
    styleUrl: './work-experience.component.scss'
})
export class WorkExperienceComponent {
    readonly assetsPath = assetsPath;
    @Input() history!: History[];

    getExperiences(): History[] {
        return this.history;
    }
}
