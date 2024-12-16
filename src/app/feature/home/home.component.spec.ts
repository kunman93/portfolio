import { Shallow } from 'shallow-render';
import { HomeComponent } from './home.component';
import { WorkstationComponent } from './workstation.component';
import { HomeModule } from './home.module';

describe("HomeComponent", () => {
    let shallow: Shallow<HomeComponent>;

    beforeEach(() => {
        shallow = new Shallow(HomeComponent, HomeModule);
    });

    it("creates a component", async () => {
        const { find } = await shallow.render(`<app-home></app-home>`);
        expect(find).toBeTruthy();
    });

    describe("template", () => {
        it("displays the background image", async () => {
            const { find } = await shallow.render(`<app-home></app-home>`);
            expect(find("#backgroundImage")).toBeTruthy();
        });

        it("displays title and description", async () => {
            const { find, instance } = await shallow.render(`<app-home></app-home>`);
            spyOn(instance, 'ngAfterViewInit');
            const title = find("#homeTitle");
            const description = find("#homeDescription");

            expect(title.nativeElement.textContent).toBe("Hi, I'm Manu");
            expect(description.nativeElement.textContent).toBe("|");
        });

        it("displays the workstation", async () => {
            const { findComponent } = await shallow.render(`<app-home></app-home>`);
            const workstationComponent = findComponent(WorkstationComponent);

            expect(workstationComponent).toBeTruthy();
        });
    });
});
