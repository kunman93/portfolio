import { Shallow } from 'shallow-render';
import { NotificationModule } from '../notification.module';
import { ToastComponent } from './toast.component';
import { ToastData } from '../models/toast-data';
import { ToastType } from '../models/toast-type';
import { ToastService } from '../services/toast.service';

describe('ToastComponent', () => {
    let shallow: Shallow<ToastComponent>;

    beforeEach(() => {
        shallow = new Shallow(ToastComponent, NotificationModule)
            .mock(ToastService, { remove: () => { } });
    });

    it('creates a component', async () => {
        const toastData: ToastData = {
            type: ToastType.SUCCESS,
            message: 'You message has been sent'
        };
        const { find } = await shallow.render({ bind: { toastData } });
        expect(find).toBeTruthy();
    });

    describe('template', () => {
        describe('success toast', () => {
            let successToastData: ToastData;

            beforeEach(() => {
                successToastData = {
                    type: ToastType.SUCCESS,
                    message: "Some success message"
                };
            });

            it('has an emerald background color', async () => {
                const { find } = await shallow.render({ bind: { toastData: successToastData } });
                const toastContainer = find('#toastContainer');

                expect(toastContainer.nativeElement.classList.value).toContain('from-emerald-600 to-emerald-700');
            });

            it('displays the check icon', async () => {
                const { find } = await shallow.render({ bind: { toastData: successToastData } });
                const faCircle = find('#faCircle');
                const faCheck = find('#faCheck');

                ['fa-solid fa-circle', 'text-green-500'].forEach(c => {
                    expect(faCircle.nativeElement.classList.value).toContain(c);
                });
                expect(faCheck.nativeElement.classList.value).toContain('fa-solid fa-check');
            });

            it('displays the title and the message', async () => {
                const { find } = await shallow.render({ bind: { toastData: successToastData } });
                const title = find('#title');
                const message = find('#message');

                expect(title.nativeElement.textContent).toBe('Success');
                expect(message.nativeElement.textContent).toBe('Some success message');
            });
        });

        describe('error toast', () => {
            let errorToastData: ToastData;

            beforeEach(() => {
                errorToastData = {
                    type: ToastType.ERROR,
                    message: "Some error message"
                };
            });

            it('has a red backround color', async () => {
                const { find } = await shallow.render({ bind: { toastData: errorToastData } });
                const toastContainer = find('#toastContainer');

                expect(toastContainer.nativeElement.classList.value).toContain('from-red-800 to-red-900');
            });

            it('displays the check icon', async () => {
                const { find } = await shallow.render({ bind: { toastData: errorToastData } });
                const faCircle = find('#faCircle');
                const faCheck = find('#faX');

                ['fa-solid fa-circle', 'text-red-500'].forEach(c => {
                    expect(faCircle.nativeElement.classList.value).toContain(c);
                });
                expect(faCheck.nativeElement.classList.value).toContain('fa-solid fa-x');
            });

            it('displays the title and the message', async () => {
                const { find } = await shallow.render({ bind: { toastData: errorToastData } });
                const title = find('#title');
                const message = find('#message');

                expect(title.nativeElement.textContent).toBe('Error');
                expect(message.nativeElement.textContent).toBe('Some error message');
            });
        });

        describe('close toast icon button', () => {
            const successToastData: ToastData = {
                type: ToastType.SUCCESS,
                message: "Some success message"
            };

            it('displays the close toast icon', async () => {
                // arrange
                const { find } = await shallow.render({ bind: { toastData: successToastData } });
                const faSquare = find('#faSquare');
                const faSquareXmark = find('#faSquareXmark');

                // assert
                ['fa-solid fa-square', 'text-white'].forEach(c => {
                    expect(faSquare.nativeElement.classList.value).toContain(c);
                });
                ['fa-solid fa-square-xmark', 'text-red-500'].forEach(c => {
                    expect(faSquareXmark.nativeElement.classList.value).toContain(c);
                });
            });

            it('remove the toast on click', async () => {
                // arrange
                const { find, inject } = await shallow.render({ bind: { toastData: successToastData } });
                const closeToastIcon = find('#closeToastIcon');
                const toastServiceMock = inject(ToastService);

                // act
                closeToastIcon.triggerEventHandler('click', {});

                // assert
                expect(toastServiceMock.remove).toHaveBeenCalledWith(0);
            });
        });

        it('displays the progress bar', async () => {
            // arrange
            const successToastData: ToastData = {
                type: ToastType.SUCCESS,
                message: "Some success message"
            };
            const { find } = await shallow.render({ bind: { toastData: successToastData } });
            const progressBar = find('#progressBar');
            const progressBarBackground = find('#progressBarBackground');

            // assert
            expect(progressBar.nativeElement.classList.value).toContain('progress-bar absolute bg-green-500 h-1 w-full');
            expect(progressBarBackground.nativeElement.classList.value).toContain('absolute -z-10 bg-white h-1 w-full');
        });
    });
});
