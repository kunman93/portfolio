import { Shallow } from 'shallow-render';
import { WorkModule } from '../work.module';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
    let shallow: Shallow<ProjectComponent>;

    beforeEach(() => {
        shallow = new Shallow(ProjectComponent, WorkModule);
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-project></app-project>`);
        expect(find).toBeTruthy();
    });
});
