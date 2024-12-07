import { AppComponent } from './app.component';
import { Shallow } from 'shallow-render';
import { AppModule } from './app.module';
import { ToastComponent } from './core/notification/components/toast.component';
import { ToastService } from './core/notification/services/toast.service';
import { ToastType } from './core/notification/models/toast-type';

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

        it('displays the toast component', async () => {
            const { findComponent } = await shallow
                .mock(ToastService, {
                    getToastDatas: () => [
                        {
                            type: ToastType.SUCCESS,
                            message: 'Your message has been sent.'
                        }
                    ]
                })
                .render(`<app-root><app-root>`);
            expect(findComponent(ToastComponent)).toHaveFoundOne();
        });

        it('does not display the toast component', async () => {
            const { findComponent } = await shallow
                .mock(ToastService, {
                    getToastDatas: () => []
                })
                .render(`<app-root><app-root>`);
            expect(findComponent(ToastComponent)).toHaveFound(0);
        });

        it('displays home section', async () => {
            const { find } = await shallow.render(`<app-root><app-root>`);
            expect(find(`app-home`)).toBeTruthy();
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
