import { Shallow } from 'shallow-render';
import { WorkComponent } from './work.component';
import { FeatureModule } from '../feature.module';
import { ExperienceCardComponent } from './experience-card.component';
import { Experience } from './experience';

describe('WorkComponent', () => {
    let shallow: Shallow<WorkComponent>;

    beforeEach(() => {
        shallow = new Shallow(WorkComponent, FeatureModule);
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-work></app-work>`);
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('displays the small title', async () => {
            const { find } = await shallow.render(`<app-work></app-work>`);
            const smallTitle = find('#smallTitle');

            expect(smallTitle.nativeElement.textContent).toBe('WHAT I HAVE DONE SO FAR');
        });

        it('displays the experience title', async () => {
            const { find } = await shallow.render(`<app-work></app-work>`);
            const title = find('#title');

            expect(title.nativeElement.textContent).toBe('Experience.');
        });

        it('displays the experience cards', async () => {
            // arrange
            const workExperiences: Experience[] = [
                {
                    jobTitle: "Full-Stack Software Engineer",
                    company: "K&W Software AG",
                    projects: []
                },
                {
                    jobTitle: "Unicorn",
                    company: "Unicorn Land",
                    projects: []
                }
            ];

            const { instance, fixture, findComponent } = await shallow.render(`<app-work></app-work>`);
            const experienceSpy = spyOn(instance, 'getExperiences').and.returnValue(workExperiences);

            // act
            fixture.detectChanges();

            // assert
            const experienceCards = findComponent(ExperienceCardComponent);
            expect(experienceCards).toHaveFound(2);
            expect(experienceCards.map(c => c.experience)).toEqual(workExperiences);
            expect(experienceSpy).toHaveBeenCalled();
        });

        it('hides the experience section if there is no work experience', async () => {
            // arrange
            const { instance, fixture, find } = await shallow.render(`<app-work></app-work>`);
            const experienceSpy = spyOn(instance, 'getExperiences').and.returnValue([]);

            // act
            fixture.detectChanges();

            // assert
            const experienceContainer = find('#experienceContainer');
            expect(experienceContainer).toHaveFound(0);
            expect(experienceSpy).toHaveBeenCalled();
        });
    });
});
