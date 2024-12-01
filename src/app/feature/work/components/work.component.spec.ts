import { Shallow } from 'shallow-render';
import { WorkComponent } from './work.component';
import { WorkModule } from '../work.module';
import { ProjectComponent } from './project.component';
import { EmploymentReferenceComponent } from './employment-reference.component';

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
        it('displays the work experience', async () => {
            const { find } = await shallow.render(`<app-work></app-work>`);

            const experienceComponent = find('#workExperience');
            expect(experienceComponent).toHaveFound(1);
        });

        it('displays the employment reference', async () => {
            const { findComponent } = await shallow.render(`<app-work></app-work>`);

            const employmentReferenceComponent = findComponent(EmploymentReferenceComponent);
            expect(employmentReferenceComponent).toHaveFound(1);
        });

        it('displays the academic history', async () => {
            const { find } = await shallow.render(`<app-work></app-work>`);

            const experienceComponent = find('#academicHistory');
            expect(experienceComponent).toHaveFound(1);
        });

        it('displays the project section', async () => {
            const { findComponent } = await shallow.render(`<app-work></app-work>`);

            const project = findComponent(ProjectComponent);
            expect(project).toHaveFound(1);
        });
    });
});
