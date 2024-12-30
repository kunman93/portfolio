import { Component, Input, OnInit } from '@angular/core';
import { History } from '../models/history';

@Component({
    selector: 'app-experience-card',
    templateUrl: './experience-card.component.html',
    styleUrl: './experience-card.component.scss'
})
export class ExperienceCardComponent implements OnInit {
    @Input() history!: History;

    ngOnInit(): void {
        if (this.history.projects.length === 0) {
            throw new Error('projects array is empty');
        }
    }
}
