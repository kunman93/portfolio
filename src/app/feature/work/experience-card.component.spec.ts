import { Shallow } from 'shallow-render';
import { FeatureModule } from '../feature.module';
import { ExperienceCardComponent } from './experience-card.component';
import { Experience } from './experience';

describe('ExperienceCardComponent', () => {
    let shallow: Shallow<ExperienceCardComponent>;

    beforeEach(() => {
        shallow = new Shallow(ExperienceCardComponent, FeatureModule);
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-experience-card></app-experience-card>`);
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('displays the experience card', async () => {
            // arrange
            const experience: Experience = {
                jobTitle: "Unicorn",
                company: "Unicorn Limited"
            };

            const { find } = await shallow.render({ bind: { experience } });
            const jobTitle = find('h3');
            const company = find('p');

            // assert
            expect(jobTitle.nativeElement.textContent).toBe(experience.jobTitle);
            expect(company.nativeElement.textContent).toBe(experience.company);
        });

        [
            {
                jobTitle: "Unicorn-Man",
                company: undefined
            },
            {
                jobTitle: undefined,
                company: "Unicorn-Land"
            },
            {
                jobTitle: undefined,
                company: undefined
            }
        ].forEach((experience: Experience) => {
            it(`hides the card for the job title ${experience.jobTitle} and company ${experience.company}`, async () => {
                const { find } = await shallow.render({ bind: { experience } });
                const jobTitle = find('h3');
                const company = find('p');

                // assert
                expect(jobTitle).toHaveFound(0);
                expect(company).toHaveFound(0);
            });
        });
    });
});
