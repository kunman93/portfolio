import { Component } from '@angular/core';
import { workExperiences } from '../data/work-experience-data';
import { academicHistory } from '../data/academic-history-data';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss'
})
export class WorkComponent {
    readonly workExperience = workExperiences;
    readonly academicHistory = academicHistory;
}
