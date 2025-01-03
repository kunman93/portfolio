import { Shallow } from 'shallow-render';
import { WorkstationComponent } from './workstation.component';
import { HomeModule } from './home.module';

describe("WorkstationComponent", () => {
    let shallow: Shallow<WorkstationComponent>;

    beforeEach(() => {
        shallow = new Shallow(WorkstationComponent, HomeModule);
    });

    it("creates a component", async () => {
        const { find } = await shallow.render(`<app-workstation></app-workstation>`);
        expect(find).toBeTruthy();
    });
});
