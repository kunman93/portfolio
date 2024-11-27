import { ProjectSectionComponent } from './project-section.component';
import { Project } from '../models/project';
import { Shallow } from 'shallow-render';
import { Task } from '../models/task';
import { TaskSectionComponent } from './task-section.component';
import { WorkModule } from '../work.module';

describe('ProjectSectionComponent', () => {
    let shallow: Shallow<ProjectSectionComponent>;
    let project: Project;

    beforeEach(() => {
        shallow = new Shallow(ProjectSectionComponent, WorkModule);
        project = {
            title: "Project title",
            description: "project description"
        };
    });

    it('creates a component', async () => {
        const { find } = await shallow.render({ bind: { project } });
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('displays only the title and description', async () => {
            // arrange
            const { find, findComponent } = await shallow.render({ bind: { project } });
            const title = find('h4');
            const description = find('p');
            const taskSectionComponent = findComponent(TaskSectionComponent);

            // assert
            expect(title.nativeElement.textContent).toBe(project.title);
            expect(description.nativeElement.textContent).toBe(project.description);
            expect(taskSectionComponent).toHaveFound(0);
        });

        it('displays the task section if provided', async () => {
            // arrange
            const task: Task = {
                taskTitle: "Being a unicorn",
                tasks: [
                    "As a unicorn, one of my tasks was to do everything.",
                    "Sometimes I did nothing."
                ]
            };
            project.task = task;
            const { findComponent } = await shallow.render({ bind: { project } });
            const taskSectionComponent = findComponent(TaskSectionComponent);

            // assert
            expect(taskSectionComponent).toHaveFound(1);
        });
    });
});
