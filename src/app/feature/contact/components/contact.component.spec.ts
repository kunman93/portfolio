import { Shallow } from 'shallow-render';
import { ContactComponent } from './contact.component';
import { ContactModule } from '../contact.module';
import { ContactEditorComponent } from './contact-editor.component';

describe('ContactComponent', () => {
    let shallow: Shallow<ContactComponent>;

    beforeEach(() => {
        shallow = new Shallow(ContactComponent, ContactModule);
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-contact></app-contact>`);
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('displays the contact editor component', async () => {
            const { findComponent } = await shallow.render(`<app-contact></app-contact>`);
            expect(findComponent(ContactEditorComponent)).toHaveFound(1);
        });
    });
});
