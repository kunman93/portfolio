import { Shallow } from 'shallow-render';
import { FeatureModule } from '../feature.module';
import { ExperienceCardComponent } from './experience-card.component';
import { Experience } from './experience';
import { ProjectSectionComponent } from './project-section.component';
import { TaskSectionComponent } from './task-section.component';

describe('ExperienceCardComponent', () => {
    let shallow: Shallow<ExperienceCardComponent>;
    let experience: Experience;

    beforeEach(() => {
        shallow = new Shallow(ExperienceCardComponent, FeatureModule);
        experience = {
            jobTitle: "Unicorn",
            company: "Unicorn Limited",
            projects: [{ title: "title", description: "description" }]
        };
    });

    it('creates a component', async () => {
        const { find } = await shallow.render({ bind: { experience } });
        expect(find).toBeTruthy();
    });

    describe("ngOnInit", () => {
        it("throws an error if there are no projects", async () => {
            // arrange
            const { instance } = await shallow.render({ bind: { experience } });

            // act
            experience.projects = [];
            instance.experience = experience;

            // assert
            expect(() => instance.ngOnInit()).toThrow(new Error('projects array is empty'));
        });
    });

    describe('template', () => {
        it('displays the experience card without tasks', async () => {
            // arrange
            const { find, findComponent } = await shallow.render({ bind: { experience } });
            const jobTitle = find('h3');
            const company = find('p');
            const projects = findComponent(ProjectSectionComponent);
            const tasks = findComponent(TaskSectionComponent);

            // assert
            expect(jobTitle.nativeElement.textContent).toBe(experience.jobTitle);
            expect(company.nativeElement.textContent).toBe(experience.company);
            expect(projects).toHaveFound(1);
            expect(tasks).toHaveFound(0);
        });

        it('displays tasks', async () => {
            // arrange
            experience.task = {
                taskTitle: "Unicorn Task",
                tasks: []
            };
            const { findComponent } = await shallow.render({ bind: { experience } });
            const tasks = findComponent(TaskSectionComponent);

            // assert
            expect(tasks).toHaveFound(1);
        });
    });
});
