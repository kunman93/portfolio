import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task';

@Component({
    selector: 'app-experience-card-task-section',
    templateUrl: './experience-card-task-section.component.html',
    styleUrl: './experience-card-task-section.component.scss'
})
export class ExperienceCardTaskSectionComponent implements OnInit {
    @Input() task!: Task;

    ngOnInit(): void {
        if (this.task.tasks.length === 0) {
            throw new Error('tasks array is empty');
        }
    }
}
