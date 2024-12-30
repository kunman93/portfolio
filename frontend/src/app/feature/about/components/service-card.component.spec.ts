import { Shallow } from 'shallow-render';
import { ServiceCardComponent } from './service-card.component';
import { Service } from '../models/service';
import { HomeModule } from '../../home/home.module';

describe('ServiceCardComponent', () => {
    let shallow: Shallow<ServiceCardComponent>;
    let service: Service;

    beforeEach(() => {
        shallow = new Shallow(ServiceCardComponent, HomeModule);
        service = {
            title: "title",
            icon: {
                srcImage: "srcIcon",
                alt: "altIcon"
            }
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
            expect(icon.nativeElement.src).toContain(service.icon.srcImage);
            expect(icon.nativeElement.alt).toContain(service.icon.alt);
            expect(title.nativeElement.textContent).toBe(service.title);
        });
    });
});
