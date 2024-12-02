import { Component } from '@angular/core';
import { NOJI_LOGO } from 'assets/assets.constants';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
    readonly NOJI_LOGO = NOJI_LOGO;
    isSelected = false;

    onDropdownMenuClick(): void {
        this.isSelected = !this.isSelected;
    }

    onLogoNameOccupationClick(): void {
        window.scroll({ top: 0, left: 0 });
    }
}
