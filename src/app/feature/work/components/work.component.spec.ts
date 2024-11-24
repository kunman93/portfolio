import { Shallow } from 'shallow-render';
import { FeatureModule } from '../../feature.module';
import { WorkComponent } from './work.component';
import { History } from '../models/history';

describe('WorkComponent', () => {
    let shallow: Shallow<WorkComponent>;
    let workExperiences: History[];

    beforeEach(() => {
        shallow = new Shallow(WorkComponent, FeatureModule);
        workExperiences = [
            {
                profession: "Full-Stack Software Engineer",
                institution: "K&W Software AG",
                logo: "k&w.png",
                dateFrom: new Date(2022, 10),
                dateUntil: new Date(2024, 7),
                projects: []
            },
            {
                profession: "Unicorn",
                institution: "Unicorn Land",
                logo: "unicorn.png",
                dateFrom: new Date(2019, 8),
                dateUntil: new Date(2022, 6),
                projects: []
            }
        ];
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-work></app-work>`);
        expect(find).toBeTruthy();
    });
});
