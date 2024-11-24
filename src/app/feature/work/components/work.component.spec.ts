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
                jobTitle: "Full-Stack Software Engineer",
                company: "K&W Software AG",
                companyLogo: "k&w.png",
                dateFrom: new Date(2022, 10),
                dateUntil: new Date(2024, 7),
                projects: []
            },
            {
                jobTitle: "Unicorn",
                company: "Unicorn Land",
                companyLogo: "unicorn.png",
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
