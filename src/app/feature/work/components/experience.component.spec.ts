import { Shallow } from 'shallow-render';
import { ExperienceComponent } from './experience.component';
import { History } from '../models/history';
import { WorkModule } from '../work.module';
import { assetsPath } from 'assets/assets-path-index';

describe('WorkExperienceComponent', () => {
    let shallow: Shallow<ExperienceComponent>;
    let history: History[];

    beforeEach(() => {
        shallow = new Shallow(ExperienceComponent, WorkModule);
        history = [
            {
                profession: "Full-Stack Software Engineer",
                institution: "K&W Software AG",
                logo: {
                    srcImage: "k&w.png",
                    alt: "k&w.png alt",
                },
                dateFrom: new Date(2022, 10),
                dateUntil: new Date(2024, 7),
                projects: []
            },
            {
                profession: "Unicorn",
                institution: "Unicorn Land",
                logo: {
                    srcImage: "unicorn.png",
                    alt: "unicorn.png alt",
                },
                dateFrom: new Date(2019, 8),
                dateUntil: new Date(2022, 6),
                projects: []
            }
        ];
    });

    it('creates a component', async () => {
        const { find } = await shallow.render({ bind: { history } });
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('displays the small title', async () => {
            const { find } = await shallow.render({
                bind: {
                    smallTitle: 'WHAT I HAVE DONE SO FAR',
                    history
                }
            });
            const smallTitle = find('#smallTitle');

            expect(smallTitle.nativeElement.textContent).toBe('WHAT I HAVE DONE SO FAR');
        });

        it('displays the experience title', async () => {
            const { find } = await shallow.render({
                bind: {
                    title: 'Experience.',
                    history
                }
            });
            const title = find('#title');

            expect(title.nativeElement.textContent).toBe('Experience.');
        });

        describe('timeline', () => {
            it('displays the company logos', async () => {
                // arrange
                const baseUrl = assetsPath.institutions;
                const { fixture, find } = await shallow.render({ bind: { history } });

                // act
                fixture.detectChanges();

                // assert
                const companyIconsDesktop = find('#logoDesktop');
                const companyIconsMobile = find('#logoMobile');
                const expectedCompanyLogoSrcs = [
                    `${baseUrl}/k&w.png`,
                    `${baseUrl}/unicorn.png`
                ];
                const expectedCompanyLogoAlts = [
                    'k&w.png alt',
                    'unicorn.png alt'
                ];
                expect(companyIconsDesktop).toHaveFound(2);
                expect(companyIconsDesktop.map(c => c.attributes['src'])).toEqual(expectedCompanyLogoSrcs);
                expect(companyIconsDesktop.map(c => c.attributes['alt'])).toEqual(expectedCompanyLogoAlts);
                expect(companyIconsMobile).toHaveFound(2);
                expect(companyIconsMobile.map(c => c.attributes['src'])).toEqual(expectedCompanyLogoSrcs);
                expect(companyIconsMobile.map(c => c.attributes['alt'])).toEqual(expectedCompanyLogoAlts);
            });

            it('displays the working period', async () => {
                // arrange
                const { fixture, find } = await shallow.render({ bind: { history } });

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
                const { fixture, find } = await shallow.render({ bind: { history } });

                // act
                fixture.detectChanges();

                // assert
                const experienceCardsDesktop = find('#experienceCardDesktop');
                const experienceCardsMobile = find('#experienceCardMobile');
                expect(experienceCardsDesktop).toHaveFound(2);
                expect(experienceCardsDesktop.map(c => c.componentInstance.history)).toEqual(history);
                expect(experienceCardsMobile).toHaveFound(2);
                expect(experienceCardsMobile.map(c => c.componentInstance.history)).toEqual(history);
            });

            it('hides the experience section if there is no work experience', async () => {
                // arrange
                const { fixture, find } = await shallow.render({ bind: { history: [] } });

                // act
                fixture.detectChanges();

                // assert
                const experienceContainer = find('#experienceContainer');
                expect(experienceContainer).toHaveFound(0);
            });
        });
    });
});
