import { Shallow } from 'shallow-render';
import { FeatureModule } from '../../feature.module';
import { CardComponent } from './card.component';
import { Service } from '../models/service';

describe('CardComponent', () => {
    let shallow: Shallow<CardComponent>;
    let service: Service;

    beforeEach(() => {
        shallow = new Shallow(CardComponent, FeatureModule);
        service = {
            title: "title",
            icon: "icon-path"
        };
    });

    it('creates a component', async () => {
        const { find } = await shallow.render({ bind: { service } });
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('displays icon and title', async () => {
            // arrange
            const { find } = await shallow.render({ bind: { service } });
            const icon = find('img');
            const title = find('p');

            // assert
            expect(icon.nativeElement.src).toContain(service.icon);
            expect(title.nativeElement.textContent).toBe(service.title);
        });
    });
});