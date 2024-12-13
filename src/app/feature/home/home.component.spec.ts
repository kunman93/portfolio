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
        it("displays title and description", async () => {
            const { find } = await shallow.render(`<app-home></app-home>`);
            const title = find("#title");
            const description = find("#description");

            expect(title.nativeElement.textContent).toBe("Hi, I'm Manu");
            expect(description.nativeElement.textContent).toBe("I'm a Full-Stack Software Engineer");
        });

        it("displays the workstation", async () => {
            const { findComponent } = await shallow.render(`<app-home></app-home>`);
            const workstationComponent = findComponent(WorkstationComponent);

            expect(workstationComponent).toBeTruthy();
        });
    });
});
