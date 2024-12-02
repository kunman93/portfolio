import { Shallow } from 'shallow-render';
import { ExperienceCardComponent } from './experience-card.component';
import { ExperienceCardProjectSectionComponent } from './experience-card-project-section.component';
import { ExperienceCardTaskSectionComponent } from './experience-card-task-section.component';
import { History } from '../models/history';
import { WorkModule } from '../work.module';

describe('ExperienceCardComponent', () => {
    let shallow: Shallow<ExperienceCardComponent>;
    let history: History;

    beforeEach(() => {
        shallow = new Shallow(ExperienceCardComponent, WorkModule);
        history = {
            title: "Unicorn",
            institution: "Unicorn Limited",
            logo: {
                srcImage: "some unicorn logo",
                alt: "some unicorn alt",
            },
            timePeriod: {
                dateFrom: new Date(2019, 8),
                dateUntil: new Date(2022, 6)
            },
            projects: [{ title: "title", description: "description" }]
        };
    });

    it('creates a component', async () => {
        const { find } = await shallow.render({ bind: { history } });
        expect(find).toBeTruthy();
    });

    describe("ngOnInit", () => {
        it("throws an error if there are no projects", async () => {
            // arrange
            const { instance } = await shallow.render({ bind: { history } });

            // act
            history.projects = [];
            instance.history = history;

            // assert
            expect(() => instance.ngOnInit()).toThrow(new Error('projects array is empty'));
        });
    });

    describe('template', () => {
        it('displays the experience card without tasks', async () => {
            // arrange
            const { find, findComponent } = await shallow.render({ bind: { history } });
            const title = find('h3');
            const institution = find('p');
            const projects = findComponent(ExperienceCardProjectSectionComponent);
            const tasks = findComponent(ExperienceCardTaskSectionComponent);

            // assert
            expect(title.nativeElement.textContent).toBe(history.title);
            expect(institution.nativeElement.textContent).toBe(history.institution);
            expect(projects).toHaveFound(1);
            expect(tasks).toHaveFound(0);
        });

        it('displays tasks', async () => {
            // arrange
            history.task = {
                taskTitle: "Unicorn Task",
                tasks: []
            };
            const { findComponent } = await shallow.render({ bind: { history } });
            const tasks = findComponent(ExperienceCardTaskSectionComponent);

            // assert
            expect(tasks).toHaveFound(1);
        });
    });
});
