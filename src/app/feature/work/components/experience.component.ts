import { Component, Input } from '@angular/core';
import { History } from '../models/history';
import { assetsPath } from '../data/work-experience-data';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
    readonly assetsPath = assetsPath;
    @Input() smallTitle!: string;
    @Input() title!: string;
    @Input() history!: History[];

    getExperiences(): History[] {
        return this.history;
    }
}
