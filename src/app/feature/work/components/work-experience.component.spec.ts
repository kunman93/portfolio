import { Shallow } from 'shallow-render';
import { WorkExperienceComponent } from './work-experience.component';
import { FeatureModule } from '../../feature.module';
import { Experience } from '../models/experience';

describe('WorkExperienceComponent', () => {
    let shallow: Shallow<WorkExperienceComponent>;
    let workExperiences: Experience[];

    beforeEach(() => {
        shallow = new Shallow(WorkExperienceComponent, FeatureModule);
        workExperiences = [
            {
                jobTitle: "Full-Stack Software Engineer",
                company: "K&W Software AG",
                companyLogo: "k&w.png",
                dateFrom: new Date(2022, 10),
                dateUntil: new Date(2024, 7),
                projects: []
            },
            {
                jobTitle: "Unicorn",
                company: "Unicorn Land",
                companyLogo: "unicorn.png",
                dateFrom: new Date(2019, 8),
                dateUntil: new Date(2022, 6),
                projects: []
            }
        ];
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-work-experience></app-work-experience>`);
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('displays the small title', async () => {
            const { find } = await shallow.render(`<app-work-experience></app-work-experience>`);
            const smallTitle = find('#smallTitle');

            expect(smallTitle.nativeElement.textContent).toBe('WHAT I HAVE DONE SO FAR');
        });

        it('displays the experience title', async () => {
            const { find } = await shallow.render(`<app-work-experience></app-work-experience>`);
            const title = find('#title');

            expect(title.nativeElement.textContent).toBe('Experience.');
        });

        describe('timeline', () => {
            it('displays the company logos', async () => {
                // arrange
                const baseUrl = 'assets/img/company';
                const { instance, fixture, find } = await shallow.render(`<app-work-experience></app-work-experience>`);
                spyOn(instance, 'getExperiences').and.returnValue(workExperiences);

                // act
                fixture.detectChanges();

                // assert
                const companyIconsDesktop = find('#companyIconDesktop');
                const companyIconsMobile = find('#companyIconMobile');
                const expectedCompanyLogos = [
                    `${baseUrl}/k&w.png`, 
                    `${baseUrl}/unicorn.png`
                ];
                expect(companyIconsDesktop).toHaveFound(2);
                expect(companyIconsDesktop.map(c => c.attributes['src'])).toEqual(expectedCompanyLogos);
                expect(companyIconsMobile).toHaveFound(2);
                expect(companyIconsMobile.map(c => c.attributes['src'])).toEqual(expectedCompanyLogos);
            });

            it('displays the working period', async () => {
                // arrange
                const { instance, fixture, find } = await shallow.render(`<app-work-experience></app-work-experience>`);
                spyOn(instance, 'getExperiences').and.returnValue(workExperiences);

                // act
                fixture.detectChanges();

                // assert
                const expectedPeriod = [
                    'November 2022 — August 2024',
                    'September 2019 — July 2022'
                ];
                const workingPeriodDesktop = find('#workingPeriodDesktop');
                const workingPeriodMobile = find('#workingPeriodMobile');
                expect(workingPeriodDesktop).toHaveFound(2);
                expect(workingPeriodDesktop.map(w => w.nativeElement.innerText)).toEqual(expectedPeriod);
                expect(workingPeriodMobile).toHaveFound(2);
                expect(workingPeriodMobile.map(w => w.nativeElement.innerText)).toEqual(expectedPeriod);
            });

            it('displays the experience cards for desktop and mobile', async () => {
                // arrange
                const { instance, fixture, find } = await shallow.render(`<app-work-experience></app-work-experience>`);
                spyOn(instance, 'getExperiences').and.returnValue(workExperiences);

                // act
                fixture.detectChanges();

                // assert
                const experienceCardsDesktop = find('#experienceCardDesktop');
                const experienceCardsMobile = find('#experienceCardMobile');
                expect(experienceCardsDesktop).toHaveFound(2);
                expect(experienceCardsDesktop.map(c => c.componentInstance.experience)).toEqual(workExperiences);
                expect(experienceCardsMobile).toHaveFound(2);
                expect(experienceCardsMobile.map(c => c.componentInstance.experience)).toEqual(workExperiences);
            });

            it('hides the experience section if there is no work experience', async () => {
                // arrange
                const { instance, fixture, find } = await shallow.render(`<app-work-experience></app-work-experience>`);
                spyOn(instance, 'getExperiences').and.returnValue([]);

                // act
                fixture.detectChanges();

                // assert
                const experienceContainer = find('#experienceContainer');
                expect(experienceContainer).toHaveFound(0);
            });
        });
    });
});
