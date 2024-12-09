import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './components/contact.component';
import { ContactEditorComponent } from './components/contact-editor.component';
import { SharedModule } from "../../shared/shared.module";
import { PlanetEarthComponent } from './components/planet-earth.component';
import { UniverseComponent } from './components/universe.component';


@NgModule({
    declarations: [
        ContactComponent,
        ContactEditorComponent,
        PlanetEarthComponent,
        UniverseComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        ContactComponent,
    ]
})
export class ContactModule { }
