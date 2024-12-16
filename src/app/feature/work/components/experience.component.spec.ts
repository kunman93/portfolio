import { Shallow } from 'shallow-render';
import { ExperienceComponent } from './experience.component';
import { History } from '../models/history';
import { WorkModule } from '../work.module';

describe('ExperienceComponent', () => {
    let shallow: Shallow<ExperienceComponent>;
    let history: History[];

    beforeEach(() => {
        shallow = new Shallow(ExperienceComponent, WorkModule);
        history = [
            {
                title: "Full-Stack Software Engineer",
                institution: "K&W Software AG",
                logo: {
                    srcImage: "kwsoft.png",
                    alt: "kwsoft.png alt",
                },
                timePeriod: {
                    dateFrom: new Date(2022, 10),
                    dateUntil: new Date(2024, 7)
                },
                projects: []
            },
            {
                title: "Unicorn",
                institution: "Unicorn Land",
                logo: {
                    srcImage: "unicorn.png",
                    alt: "unicorn.png alt",
                },
                timePeriod: {
                    dateFrom: new Date(2019, 8),
                    dateUntil: new Date(2022, 6)
                },
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
            const smallTitle = find('#experienceSmallTitle');

            expect(smallTitle.nativeElement.textContent).toBe('WHAT I HAVE DONE SO FAR');
        });

        it('displays the experience title', async () => {
            const { find } = await shallow.render({
                bind: {
                    title: 'Experience.',
                    history
                }
            });
            const title = find('#experienceTitle');

            expect(title.nativeElement.textContent).toBe('Experience.');
        });

        describe('timeline', () => {
            it('displays the company logos', async () => {
                // arrange
                const { fixture, find } = await shallow.render({ bind: { history } });

                // act
                fixture.detectChanges();

                // assert
                const companyIconsDesktop = find('#logoDesktop');
                const companyIconsMobile = find('#logoMobile');
                const expectedCompanyLogoSrcs = [
                    'kwsoft.png',
                    'unicorn.png'
                ];
                const expectedCompanyLogoAlts = [
                    'kwsoft.png alt',
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
                const workingPeriodsDesktopRight = find('#workingPeriodDesktop0');
                const workingPeriodsDesktopLeft = find('#workingPeriodDesktop1');
                const workingPeriodsMobileRight = find('#workingPeriodMobile0');
                const workingPeriodsMobileLeft = find('#workingPeriodMobile1');
                expect(workingPeriodsDesktopRight).toHaveFound(1);
                expect(workingPeriodsDesktopLeft).toHaveFound(1);
                expect(workingPeriodsDesktopRight.map(w => w.nativeElement.innerText)).toContain(expectedPeriod[0]);
                expect(workingPeriodsDesktopLeft.map(w => w.nativeElement.innerText)).toContain(expectedPeriod[1]);
                expect(workingPeriodsMobileRight).toHaveFound(1);
                expect(workingPeriodsMobileLeft).toHaveFound(1);
                expect(workingPeriodsMobileRight.map(w => w.nativeElement.innerText)).toContain(expectedPeriod[0]);
                expect(workingPeriodsMobileLeft.map(w => w.nativeElement.innerText)).toContain(expectedPeriod[1]);
            });

            it('displays the experience cards for desktop and mobile', async () => {
                // arrange
                const { fixture, find } = await shallow.render({ bind: { history } });

                // act
                fixture.detectChanges();

                // assert
                const experienceCardsDesktopLeft = find('#experienceCardDesktop0');
                const experienceCardsDesktopRight = find('#experienceCardDesktop1');
                const experienceCardsMobile0 = find('#experienceCardMobile0');
                const experienceCardsMobile1 = find('#experienceCardMobile1');
                expect(experienceCardsDesktopLeft).toHaveFound(1);
                expect(experienceCardsDesktopRight).toHaveFound(1);
                expect(experienceCardsDesktopLeft.map(c => c.componentInstance.history)).toContain(history[0]);
                expect(experienceCardsDesktopRight.map(c => c.componentInstance.history)).toContain(history[1]);
                expect(experienceCardsMobile0).toHaveFound(1);
                expect(experienceCardsMobile1).toHaveFound(1);
                expect(experienceCardsMobile0.map(c => c.componentInstance.history)).toContain(history[0]);
                expect(experienceCardsMobile1.map(c => c.componentInstance.history)).toContain(history[1]);
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
