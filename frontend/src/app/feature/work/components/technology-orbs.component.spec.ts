import { TechnologyOrbsComponent } from './technology-orbs.component';
import { Shallow } from 'shallow-render';
import { WorkModule } from '../work.module';

describe("TechnologyOrbsComponent", () => {
    let shallow: Shallow<TechnologyOrbsComponent>;

    beforeEach(() => {
        shallow = new Shallow(TechnologyOrbsComponent, WorkModule);
    });

    it("creates a component", async () => {
        const { find } = await shallow.render(`<app-technology-orbs></app-technology-orbs>`);
        expect(find).toBeTruthy();
    });
});
