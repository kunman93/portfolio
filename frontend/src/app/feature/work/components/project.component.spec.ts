import { Shallow } from 'shallow-render';
import { WorkModule } from '../work.module';
import { ProjectComponent } from './project.component';
import { ProjectCardComponent } from './project-card.component';
import { projects } from '../data/projects-data';
import { CdkFixedSizeVirtualScroll, ScrollingModule } from '@angular/cdk/scrolling';

describe('ProjectComponent', () => {
    let shallow: Shallow<ProjectComponent>;

    beforeEach(() => {
        shallow = new Shallow(ProjectComponent, WorkModule);
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-project></app-project>`);
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('displays the small title', async () => {
            const { find } = await shallow.render(`<app-project></app-project>`);
            const smallTitle = find('#projectsSmallTitle');

            expect(smallTitle.nativeElement.textContent).toBe('MY WORK');
        });

        it('displays the projects title', async () => {
            const { find } = await shallow.render(`<app-project></app-project>`);
            const title = find('#projectsTitle');

            expect(title.nativeElement.textContent).toBe('Projects.');
        });

        it('displays the projects text', async () => {
            const { find } = await shallow.render(`<app-project></app-project>`);
            const overviewText = find('#projectsText');
            const expectedProjectsText = "The projects below showcase my skills and experience. Each one includes a brief description and a link to my GitHub repository, where you can explore live demos. These projects demonstrate my expertise in solving problems, utilizing various technologies, and managing projects efficiently.";

            expect(overviewText.nativeElement.textContent.trim()).toBe(expectedProjectsText.trim());
        });

        it('displays the project cards in a scroll view', async () => {
            // arrange
            const { findComponent } = await shallow.dontMock(ScrollingModule).render(`<app-project></app-project>`);
            const scrollViewport = findComponent(CdkFixedSizeVirtualScroll);
            const projectCards = findComponent(ProjectCardComponent);

            expect(scrollViewport).toHaveFound(1);
            expect(projectCards).toHaveFound(projects.length);
            expect(projectCards.map(p => p.project)).toEqual(projects);
        });

        it("hides the project section if there are no projects", async () => {
            // arrange
            const { find, findComponent, instance, fixture } = await shallow.render(`<app-project></app-project>`);
            Object.defineProperty(instance, 'projects', { value: [], writable: false });

            // act
            fixture.detectChanges();

            // assert
            expect(find('#smallTitle')).toHaveFound(0);
            expect(find('#title')).toHaveFound(0);
            expect(findComponent(ProjectCardComponent)).toHaveFound(0);
        });
    });
});
