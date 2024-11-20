import { Shallow } from 'shallow-render';
import { AboutComponent } from './about.component';
import { FeatureModule } from '../feature.module';

describe('AboutComponent', () => {
    let shallow: Shallow<AboutComponent>;

    beforeEach(() => {
        shallow = new Shallow(AboutComponent, FeatureModule);
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-about></app-about>`);
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('displays the small title', async () => {
            const { find } = await shallow.render(`<app-about></app-about>`);
            const smallTitle = find('#smallTitle');

            expect(smallTitle.nativeElement.textContent).toBe('INTRODUCTION');
        });

        it('displays the overview title', async () => {
            const { find } = await shallow.render(`<app-about></app-about>`);
            const title = find('#title');

            expect(title.nativeElement.textContent).toBe('Overview.');
        });

        it('displays the overview text', async () => {
            const { find } = await shallow.render(`<app-about></app-about>`);
            const overviewText = find('#overviewText');
            const expectedOverviewText = "I am a Full-Stack Software Engineer with hands-on experience in developing and testing scalable web applications within an agile team consisting of Software Engineers, UI / UX Designers and Business Analysts. With a solid foundation in software development, combined with a passion for continuous learning, alongside working with a cohort of experienced professionals who share my dedication and enthusiasm, I'm eager to contribute to your innovative team and help drive the success of your company.";

            expect(overviewText.nativeElement.textContent.trim()).toBe(expectedOverviewText);
        });
    });
});
