import { Shallow } from 'shallow-render';
import { AboutComponent } from './about.component';
import { ServiceCardComponent } from './service-card.component';
import { Service } from '../models/service';
import { AboutModule } from '../about.module';
import { SERVICES } from 'assets/assets.constants';

describe('AboutComponent', () => {
    let shallow: Shallow<AboutComponent>;

    beforeEach(() => {
        shallow = new Shallow(AboutComponent, AboutModule);
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-about></app-about>`);
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('displays the small title', async () => {
            const { find } = await shallow.render(`<app-about></app-about>`);
            const smallTitle = find('#overviewSmallTitle');

            expect(smallTitle.nativeElement.textContent).toBe('INTRODUCTION');
        });

        it('displays the overview title', async () => {
            const { find } = await shallow.render(`<app-about></app-about>`);
            const title = find('#overviewTitle');

            expect(title.nativeElement.textContent).toBe('Overview.');
        });

        it('displays the overview text', async () => {
            const { find } = await shallow.render(`<app-about></app-about>`);
            const overviewText = find('#overviewText');
            const expectedOverviewText = "I am a Full-Stack Software Engineer with hands-on experience in developing and testing scalable web applications within an agile team consisting of Software Engineers, UI / UX Designers and Business Analysts. With a solid foundation in software development, combined with a passion for continuous learning, alongside working with a cohort of experienced professionals who share my dedication and enthusiasm, I'm eager to contribute to your innovative team and help drive the success of your company.";

            expect(overviewText.nativeElement.textContent.trim()).toBe(expectedOverviewText);
        });

        it('displays four service cards', async () => {
            // arrange
            const { findComponent } = await shallow.render(`<app-about></app-about>`);
            const cards = findComponent(ServiceCardComponent);

            // assert
            const expectedService: Service[] = [
                {
                    title: 'Web Developer',
                    icon: {
                        srcImage: SERVICES.web,
                        alt: 'Web Icon'
                    }
                },
                {
                    title: "Frontend Developer",
                    icon: {
                        srcImage: SERVICES.frontend,
                        alt: 'Frontend Icon'
                    }
                },
                {
                    title: 'Backend Developer',
                    icon: {
                        srcImage: SERVICES.backend,
                        alt: 'Backend Icon'
                    }
                },
                {
                    title: "DevOps Engineer",
                    icon: {
                        srcImage: SERVICES.devOps,
                        alt: 'DevOps Icon'
                    }

                }
            ];
            expect(cards).toHaveFound(4);
            expect(cards.map(c => c.service)).toEqual(expectedService);
        });
    });
});
