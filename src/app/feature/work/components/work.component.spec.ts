import { Shallow } from 'shallow-render';
import { WorkComponent } from './work.component';
import { WorkModule } from '../work.module';
import { ProjectComponent } from './project.component';

describe('WorkComponent', () => {
    let shallow: Shallow<WorkComponent>;

    beforeEach(() => {
        shallow = new Shallow(WorkComponent, WorkModule);
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-work></app-work>`);
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it('display the work experience', async () => {
            const { find } = await shallow.render(`<app-work></app-work>`);

            const workExperienceComponent = find('#workExperience');
            expect(workExperienceComponent).toHaveFound(1);
        });

        it('display the academic history', async () => {
            const { find } = await shallow.render(`<app-work></app-work>`);

            const workExperienceComponent = find('#academicHistory');
            expect(workExperienceComponent).toHaveFound(1);
        });

        it('displays the project section', async () => {
            const { findComponent } = await shallow.render(`<app-work></app-work>`);

            const project = findComponent(ProjectComponent);
            expect(project).toHaveFound(1);
        });
    });
});
