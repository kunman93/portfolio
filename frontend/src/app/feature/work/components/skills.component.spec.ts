import { SkillsComponent } from './skills.component';
import { Shallow } from 'shallow-render';
import { WorkModule } from '../work.module';
import { TechnologyOrbsComponent } from './technology-orbs.component';

describe('SkillsComponent', () => {
    let shallow: Shallow<SkillsComponent>;

    beforeEach(() => {
        shallow = new Shallow(SkillsComponent, WorkModule);
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-skills></app-skills>`);
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        it("displays the background image", async () => {
            const { find } = await shallow.render(`<app-skills></app-skills>`);
            expect(find("#backgroundImage")).toBeTruthy();
        });

        it('displays the small title', async () => {
            const { find } = await shallow.render(`<app-skills></app-skills>`);
            const smallTitle = find('#skillsSmallTitle');

            expect(smallTitle.nativeElement.textContent).toBe('THE TECHNOLOGIES I HAVE WORKED WITH SO FAR');
        });

        it('displays the overview title', async () => {
            const { find } = await shallow.render(`<app-skills></app-skills>`);
            const title = find('#skillsTitle');

            expect(title.nativeElement.textContent).toBe('Skills.');
        });

        it('displays technology orbs', async () => {
            const { findComponent } = await shallow.render(`<app-skills></app-skills>`);

            const technologyOrbs = findComponent(TechnologyOrbsComponent);
            expect(technologyOrbs).toHaveFound(1);
        });
    });
});
