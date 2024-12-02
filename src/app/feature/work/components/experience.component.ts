import { Component, Input } from '@angular/core';
import { History } from '../models/history';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
    @Input() smallTitle!: string;
    @Input() title!: string;
    @Input() history!: History[];
}
