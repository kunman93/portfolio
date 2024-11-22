import { Component, Input, OnInit } from '@angular/core';
import { Experience } from '../models/experience';

@Component({
    selector: 'app-experience-card',
    templateUrl: './experience-card.component.html',
    styleUrl: './experience-card.component.scss'
})
export class ExperienceCardComponent implements OnInit {
    @Input() experience!: Experience;

    ngOnInit(): void {
        if (this.experience.projects.length === 0) {
            throw new Error('projects array is empty');
        }
    }
}
