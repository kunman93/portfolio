import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withInMemoryScrolling } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [
        provideRouter(routes, withInMemoryScrolling({
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled'
        }))
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
