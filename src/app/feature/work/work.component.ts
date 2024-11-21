import { Component } from '@angular/core';
import { Experience } from './experience';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss'
})
export class WorkComponent {
    private readonly experiences: Experience[] = [
        {
            jobTitle: "Full-Stack Software Engineer",
            company: "K&W Software AG"
        }
    ];

    getExperiences(): Experience[] {
        return this.experiences;
    }
}
