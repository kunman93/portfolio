import { AppComponent } from './app.component';
import { Shallow } from 'shallow-render';
import { AppModule } from './app.module';

describe('AppComponent', () => {
    let shallow: Shallow<AppComponent>;

    beforeEach(async () => {
        shallow = new Shallow(AppComponent, AppModule);
    });

    it('should create the app', async () => {
        const { find } = await shallow.render(`<app-root><app-root>`);
        expect(find).toBeTruthy();
    });

    describe("template", () => {
        it('displays the nav bar component', async () => {
            const { find } = await shallow.render(`<app-root><app-root>`);
            expect(find(`app-nav-bar`)).toBeTruthy();
        });

        it('displays about section', async () => {
            const { find } = await shallow.render(`<app-root><app-root>`);
            expect(find(`app-about`)).toBeTruthy();
        });

        it('displays the work section', async () => {
            const { find } = await shallow.render(`<app-root><app-root>`);
            expect(find(`app-work`)).toBeTruthy();
        });

        it('displays the contact section', async () => {
            const { find } = await shallow.render(`<app-root><app-root>`);
            expect(find(`app-contact`)).toBeTruthy();
        });
    });
});
