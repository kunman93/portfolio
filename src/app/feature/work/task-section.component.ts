import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task';

@Component({
    selector: 'app-task-section',
    templateUrl: './task-section.component.html',
    styleUrl: './task-section.component.scss'
})
export class TaskSectionComponent implements OnInit {
    @Input() task!: Task;

    ngOnInit(): void {
        if (this.task.tasks.length === 0) {
            throw new Error('tasks array is empty');
        }
    }
}
