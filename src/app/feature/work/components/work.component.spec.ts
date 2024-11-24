import { Shallow } from 'shallow-render';
import { FeatureModule } from '../../feature.module';
import { WorkComponent } from './work.component';

describe('WorkComponent', () => {
    let shallow: Shallow<WorkComponent>;

    beforeEach(() => {
        shallow = new Shallow(WorkComponent, FeatureModule);
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
    });
});
