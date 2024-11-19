import { Component } from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
    isSelected = false;

    onDropdownMenuClick(): void {
        this.isSelected = !this.isSelected;
    }

    onLogoNameOccupationClick(): void {
        window.scroll({ top: 0, left: 0 });
    }
}
