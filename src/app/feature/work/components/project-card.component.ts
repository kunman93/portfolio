import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../models/project';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent implements OnInit {
    @Input() project!: Project;
    imageSource?: string;

    ngOnInit(): void {
        if (!this.arePropertiesValid()) {
            throw new Error('project has falsy properties');
        }
        this.imageSource = this.project.img?.srcImage;
    }

    private arePropertiesValid(): boolean {
        return Object.entries(this.project)
            .filter(e => e[0] !== 'task')
            .map(e => e[1])
            .every(prop => prop);
    }

    onMouseOver(): void {
        this.imageSource = this.project.img?.srcGif;
    }

    onMouseLeave(): void {
        this.imageSource = this.project.img?.srcImage;
    }
}
