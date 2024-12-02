import { Component } from '@angular/core';
import { academicHistory } from '../data/academic-history-data';
import { workHistory } from '../data/work-history-data';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss'
})
export class WorkComponent {
    readonly workHistory = workHistory;
    readonly academicHistory = academicHistory;
}
