import { ContactModule } from '../contact.module';
import { PlanetEarthComponent } from './planet-earth.component';
import { Shallow } from 'shallow-render';

xdescribe("PlanetEarthComponent", () => {
    let shallow: Shallow<PlanetEarthComponent>;

    beforeEach(() => {
        shallow = new Shallow(PlanetEarthComponent, ContactModule);
    });

    it("creates a component", async () => {
        const { find } = await shallow.render(`<app-planet-earth></app-planet-earth>`);
        expect(find).toBeTruthy();
    });
});
