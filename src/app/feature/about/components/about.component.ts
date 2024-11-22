import { Component } from '@angular/core';
import { Service } from '../models/service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
    private readonly assetsPath = "assets/img";
    readonly services: Service[] = [
        {
            title: "Web Developer",
            icon: `${this.assetsPath}/web.png`
        },
        {
            title: "Frontend Developer",
            icon: `${this.assetsPath}/frontend.png`
        },
        {
            title: "Backend Developer",
            icon: `${this.assetsPath}/backend.png`
        },
        {
            title: "DevOps Engineer",
            icon: `${this.assetsPath}/dev-ops.png`
        }
    ];
}
