import { Shallow } from 'shallow-render';
import { FeatureModule } from '../../feature.module';
import { TaskSectionComponent } from './task-section.component';
import { Task } from '../models/task';

describe('TaskSectionComponent', () => {
    let shallow: Shallow<TaskSectionComponent>;
    let task: Task;

    beforeEach(() => {
        shallow = new Shallow(TaskSectionComponent, FeatureModule);
        task = {
            taskTitle: "title",
            tasks: ["task 1", "task 2"]
        };
    });

    it('creates a component', async () => {
        const { find } = await shallow.render({ bind: { task } });
        expect(find).toBeTruthy();
    });

    describe("ngOnInit", () => {
        it("throws an error if there are no tasks", async () => {
            // arrange
            const { instance } = await shallow.render({ bind: { task } });

            // act
            task.tasks = [];
            instance.task = task;

            // assert
            expect(() => instance.ngOnInit()).toThrow(new Error('tasks array is empty'));
        });
    });

    describe('template', () => {
        it('displays the task title and tasks', async () => {
            // arrange
            const task: Task = {
                taskTitle: "Being a unicorn",
                tasks: [
                    "As a unicorn, one of my tasks was to do everything.",
                    "Sometimes I did nothing."
                ]
            };
            const { find } = await shallow.render({ bind: { task } });
            const title = find('h4');
            const tasks = find('li');

            // assert
            expect(title.nativeElement.textContent).toBe(task.taskTitle)
            expect(tasks).toHaveFound(2);
            expect(tasks.map(t => t.nativeElement.textContent)).toEqual(task.tasks);
        });
    });
});
