import { Shallow } from 'shallow-render';
import { AboutComponent } from './about.component';
import { CardComponent } from './card.component';
import { Service } from '../models/service';
import { AboutModule } from '../about.module';
import { assetsPath } from 'assets/assets-path-index';

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

        it('displays four cards', async () => {
            // arrange
            const { findComponent } = await shallow.render(`<app-about></app-about>`);
            const cards = findComponent(CardComponent);

            // assert
            const expectedService: Service[] = [
                {
                    title: 'Web Developer',
                    icon: {
                        srcImage: 'web.png',
                        alt: 'Web Icon'
                    }
                },
                {
                    title: "Frontend Developer",
                    icon: {
                        srcImage: 'frontend.png',
                        alt: 'Frontend Icon'
                    }
                },
                {
                    title: 'Backend Developer',
                    icon: {
                        srcImage: 'backend.png',
                        alt: 'Backend Icon'
                    }
                },
                {
                    title: "DevOps Engineer",
                    icon: {
                        srcImage: 'dev-ops.png',
                        alt: 'DevOps Icon'
                    }

                }
            ].map(s => Object.assign(s, {
                icon: {
                    srcImage: `${assetsPath.services}/${s.icon.srcImage}`
                }
            }));
            expect(cards).toHaveFound(4);
            expect(cards.map(c => c.service)).toEqual(expectedService);
        });
    });
});
