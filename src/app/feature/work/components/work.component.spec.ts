import { Shallow } from 'shallow-render';
import { WorkComponent } from './work.component';
import { TechnologyOrbComponent } from './technology-orb.component';
import { technologies } from '../data/technologies';
import { WorkModule } from '../work.module';

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

        it('displays technology orbs', async () => {
            const { findComponent } = await shallow.render(`<app-work></app-work>`);

            const technologyOrbs = findComponent(TechnologyOrbComponent);
            expect(technologyOrbs).toHaveFound(technologies.length);
        });
    });
});
