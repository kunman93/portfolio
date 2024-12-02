import { Component, OnInit } from '@angular/core';
import { employmentReferences } from '../data/employment-reference-data';
import { EmploymentReference } from '../models/employment-reference';

@Component({
    selector: 'app-employment-reference-carousel',
    templateUrl: './employment-reference-carousel.component.html',
    styleUrl: './employment-reference-carousel.component.scss'
})
export class EmploymentReferenceCarouselComponent implements OnInit {
    readonly employmentReferences = employmentReferences;
    currentIndex = 0;
    currentEmploymentReference!: EmploymentReference;

    ngOnInit(): void {
        this.currentEmploymentReference = employmentReferences[this.currentIndex];
    }

    onPrevClick(): void {
        this.currentIndex = this.currentIndex > 0
            ? this.currentIndex - 1
            : this.employmentReferences.length - 1;
    }

    onNextClick(): void {
        this.currentIndex = this.currentIndex < this.employmentReferences.length - 1
            ? this.currentIndex + 1
            : 0;
    }

    onSelectedClick(index: number): void {
        this.currentIndex = index
    }
}
