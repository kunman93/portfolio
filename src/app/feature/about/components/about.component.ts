import { Component } from '@angular/core';
import { Service } from '../models/service';
import { service } from '../data/service-data';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
    readonly services: Service[] = service;
}
