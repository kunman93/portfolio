import { Component, Input } from '@angular/core';
import { History } from '../models/history';
import { assetsPath } from 'assets/assets-path-index';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
    readonly assetsPath = assetsPath.institutions;
    @Input() smallTitle!: string;
    @Input() title!: string;
    @Input() history!: History[];
}
