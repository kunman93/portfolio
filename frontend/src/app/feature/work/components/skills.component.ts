import { Component } from '@angular/core';
import { Image } from 'shared/models/image';
import { BACKGROUNDS } from 'assets/assets.constants';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss'
})
export class SkillsComponent {
    readonly backGroundImage: Image = {
        srcImage: BACKGROUNDS.inkblot1,
        alt: "inkblot background"
    };
}
