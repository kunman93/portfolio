import { Shallow } from 'shallow-render';
import { FeatureModule } from '../feature.module';
import { CardComponent } from './card.component';
import { Service } from './service';

describe('CardComponent', () => {
    let shallow: Shallow<CardComponent>;

    beforeEach(() => {
        shallow = new Shallow(CardComponent, FeatureModule);
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-card></app-card>`);
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('displays icon and title', async () => {
            // arrange
            const service: Service = {
                title: "title",
                icon: "icon-path"
            };
            const { find } = await shallow.render({bind: { service }});
            const icon = find('img');
            const title = find('p');

            // assert
            expect(icon.nativeElement.src).toContain(service.icon);
            expect(title.nativeElement.textContent).toBe(service.title);
        });
    });
});
