import { ContactModule } from '../contact.module';
import { UniverseComponent } from './universe.component';
import { Shallow } from 'shallow-render';

describe("UniverseComponent", () => {
    let shallow: Shallow<UniverseComponent>;

    beforeEach(() => {
        shallow = new Shallow(UniverseComponent, ContactModule);
    });

    it("creates a component", async () => {
        const { find } = await shallow.render(`<app-universe></app-universe>`);
        expect(find).toBeTruthy();
    });
});
