import { Shallow } from 'shallow-render';
import { FeatureModule } from '../../feature.module';
import { ExperienceCardComponent } from './experience-card.component';
import { ProjectSectionComponent } from './project-section.component';
import { TaskSectionComponent } from './task-section.component';
import { History } from '../models/history';

describe('ExperienceCardComponent', () => {
    let shallow: Shallow<ExperienceCardComponent>;
    let history: History;

    beforeEach(() => {
        shallow = new Shallow(ExperienceCardComponent, FeatureModule);
        history = {
            jobTitle: "Unicorn",
            company: "Unicorn Limited",
            companyLogo: "some unicorn logo",
            dateFrom: new Date(2019, 8),
            dateUntil: new Date(2022, 6),
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
            const jobTitle = find('h3');
            const company = find('p');
            const projects = findComponent(ProjectSectionComponent);
            const tasks = findComponent(TaskSectionComponent);

            // assert
            expect(jobTitle.nativeElement.textContent).toBe(history.jobTitle);
            expect(company.nativeElement.textContent).toBe(history.company);
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
            const tasks = findComponent(TaskSectionComponent);

            // assert
            expect(tasks).toHaveFound(1);
        });
    });
});
