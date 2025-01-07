import { Component, Input } from '@angular/core';
import { Service } from '../models/service';

@Component({
    selector: 'app-service-card',
    templateUrl: './service-card.component.html',
    styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {
    @Input() service!: Service;
}
