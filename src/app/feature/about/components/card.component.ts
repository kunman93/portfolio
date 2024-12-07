import { Component, Input } from '@angular/core';
import { Service } from '../models/service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
    @Input() service!: Service;
}
