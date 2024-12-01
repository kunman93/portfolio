import { Shallow } from 'shallow-render';
import { EmploymentReferenceComponent } from './employment-reference.component';
import { WorkModule } from '../work.module';
import { EmploymentReferenceCarouselComponent } from './employment-reference-carousel.component';

describe('EmploymentReferenceComponent', () => {
    let shallow: Shallow<EmploymentReferenceComponent>;

    beforeEach(() => {
        shallow = new Shallow(EmploymentReferenceComponent, WorkModule);
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-employment-reference></app-employment-reference>`);
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('displays the small title', async () => {
            const { find } = await shallow.render(`<app-employment-reference></app-employment-reference>`);
            const smallTitle = find('#smallTitle');

            expect(smallTitle.nativeElement.textContent).toBe('WHAT OTHERS SAY');
        });

        it('displays the employment reference title', async () => {
            const { find } = await shallow.render(`<app-employment-reference></app-employment-reference>`);
            const title = find('#title');

            expect(title.nativeElement.textContent).toBe('Employment References.');
        });

        it('displays the employment reference coursel component', async () => {
            const { findComponent } = await shallow.render(`<app-employment-reference></app-employment-reference>`);
            const employmentReferenceComponent = findComponent(EmploymentReferenceCarouselComponent);

            expect(employmentReferenceComponent).toHaveFound(1);
        });
    });
});
