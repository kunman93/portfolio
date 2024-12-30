import { Shallow } from 'shallow-render';
import { ContactEditorComponent } from './contact-editor.component';
import { ContactModule } from '../contact.module';
import { Sender } from '../models/sender';
import { fakeAsync, tick } from '@angular/core/testing';
import { ToastService } from 'src/app/core/notification/services/toast.service';
import { ToastType } from 'src/app/core/notification/models/toast-type';
import { EmailService } from '../services/email.service';

describe('ContactEditorComponent', () => {
    let shallow: Shallow<ContactEditorComponent>;

    beforeEach(() => {
        shallow = new Shallow(ContactEditorComponent, ContactModule)
            .mock(EmailService, {
                sendEmail: () => new Promise(resolve =>
                    setTimeout(() =>
                        resolve({
                            status: 200,
                            text: 'OK'
                        }),
                        3000
                    ))
            })
            .mock(ToastService, {
                add: () => { return }
            });
    });

    it('creates a component', async () => {
        const { find } = await shallow.render(`<app-contact-editor></app-contact-editor>`);
        expect(find).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('initalises the form', async () => {
            const sender: Sender = { name: 'John Doe', email: 'john@example.org', message: 'Hello from John' }
            const { instance } = await shallow.render({ bind: { sender } });
            const form = instance.contactEditorForm;

            expect(form.name?.value).toBe('John Doe');
            expect(form.email?.value).toBe('john@example.org');
            expect(form.message?.value).toBe('Hello from John');
        });
    });

    describe('onSubmit', () => {
        it('updates the model', async () => {
            // arrange
            const sender: Sender = { name: '', email: '', message: '' };
            const { instance, fixture } = await shallow.render({ bind: { sender } });
            await fixture.whenStable(); // Waits for all promises to resolve

            const updateModelSpy = spyOn(instance.contactEditorForm, 'updateModel').and.callThrough();

            instance.contactEditorForm.name?.setValue('John Doe');
            instance.contactEditorForm.email?.setValue('john.doe@example.org');
            instance.contactEditorForm.message?.setValue('Hello from John');

            // act
            instance.onSubmit();

            // assert
            const expectedSender: Sender = {
                name: 'John Doe',
                email: 'john.doe@example.org',
                message: 'Hello from John'
            };
            expect(updateModelSpy).toHaveBeenCalledWith(sender);
            expect(sender).toEqual(expectedSender);
        });

        it('sends an email, resets the form and prompts the toast service to add a success toast', fakeAsync(async () => {
            // arrange
            const sender: Sender = { name: '', email: '', message: '' };

            const { inject, instance } = await shallow.render({ bind: { sender } });

            const emailServiceMock = inject(EmailService);
            const toastServiceMock = inject(ToastService);

            const resetSpy = spyOn(instance.contactEditorForm.formGroup, 'reset').and.callThrough();

            // act
            instance.onSubmit();
            tick(3000);

            // assert
            expect(emailServiceMock.sendEmail).toHaveBeenCalled();
            expect(resetSpy).toHaveBeenCalled();
            expect(toastServiceMock.add).toHaveBeenCalledWith({
                type: ToastType.SUCCESS,
                message: "Your message has been sent."
            });
        }));

        it('fails to send an email which prompts the toast service to add an error toast', fakeAsync(async () => {
            // arrange
            const sender: Sender = { name: '', email: '', message: '' };

            const { inject, instance } = await shallow
                .mock(EmailService, {
                    sendEmail: () => new Promise((_resolve, reject) =>
                        setTimeout(() =>
                            reject({
                                status: 500,
                                text: 'NOK'
                            }),
                            3000
                        ))
                })
                .render({ bind: { sender } });

            const emailServiceMock = inject(EmailService);
            const toastServiceMock = inject(ToastService);

            const resetSpy = spyOn(instance.contactEditorForm.formGroup, 'reset');

            // act
            instance.onSubmit();
            tick(3000);

            // assert
            expect(emailServiceMock.sendEmail).toHaveBeenCalled();
            expect(resetSpy).not.toHaveBeenCalled();
            expect(toastServiceMock.add).toHaveBeenCalledWith({
                type: ToastType.ERROR,
                message: "Something went wrong, try again later."
            });
        }));
    });

    describe('template', () => {
        it('displays the small title', async () => {
            const { find } = await shallow.render(`<app-contact-editor></app-contact-editor>`);
            const smallTitle = find('#smallTitle');

            expect(smallTitle.nativeElement.textContent).toBe("LET'S CHAT");
        });

        it('displays the contact me title', async () => {
            const { find } = await shallow.render(`<app-contact-editor></app-contact-editor>`);
            const title = find('#title');

            expect(title.nativeElement.textContent).toBe('Contact Me.');
        });

        describe('form', () => {
            [
                {
                    labelId: '#labelName',
                    inputFieldId: '#name',
                    expectedLabelName: 'Name',
                    expectedInputPlaceholder: 'John Doe'
                },
                {
                    labelId: '#labelEmail',
                    inputFieldId: '#email',
                    expectedLabelName: 'Email',
                    expectedInputPlaceholder: 'john.doe@example.org'
                },
                {
                    labelId: '#labelName',
                    inputFieldId: '#name',
                    expectedLabelName: 'Name',
                    expectedInputPlaceholder: 'John Doe'
                },
            ].forEach(params => {
                it('displays the label and the corresponding input field', async () => {
                    // arrange
                    const { find } = await shallow.render(`<app-contact-editor></app-contact-editor>`);
                    const label = find(params.labelId);
                    const inputField = find(params.inputFieldId);

                    // assert
                    expect(label.nativeElement.textContent).toBe(params.expectedLabelName);
                    expect(inputField.nativeElement.textContent).toBe('');
                    expect(inputField.nativeElement.placeholder).toBe(params.expectedInputPlaceholder);
                });
            });

            it('displays the message label and the corresponding text area', async () => {
                // arrange
                const { find } = await shallow.render(`<app-contact-editor></app-contact-editor>`);
                const labelName = find('#labelMessage');
                const textArea = find('#message');

                // assert
                expect(labelName.nativeElement.textContent).toBe('Message');
                expect(textArea.nativeElement.textContent).toBe('');
                expect(textArea.nativeElement.placeholder).toBe('What do you want to say?');
            });

            describe('submit button', () => {
                [
                    { name: '', email: 'johndoe@example.org', message: 'I have nothing to say' },
                    { name: 'John Doe', email: '', message: 'I have nothing to say' },
                    { name: 'John Doe', email: 'invalid email', message: 'I have nothing to say' },
                    { name: 'John Doe', email: 'johndoe@example.org', message: '' }
                ].forEach(params => {
                    it('displays the submit message button which is disabled when a field is invalid', async () => {
                        // arrange
                        const { find, fixture } = await shallow.render(`<app-contact-editor></app-contact-editor>`);
                        const inputFieldName = find('#name');
                        const inputFieldEmail = find('#email');
                        const textAreaMessage = find('#message');
                        const submitButton = find('#submitButton');

                        inputFieldName.nativeElement.value = params.name;
                        inputFieldEmail.nativeElement.value = params.email;
                        textAreaMessage.nativeElement.value = params.message;

                        inputFieldName.triggerEventHandler('input', { target: inputFieldName.nativeElement });
                        inputFieldEmail.triggerEventHandler('input', { target: inputFieldEmail.nativeElement });
                        textAreaMessage.triggerEventHandler('input', { target: textAreaMessage.nativeElement });

                        // act
                        fixture.detectChanges();

                        // assert
                        expect(submitButton.nativeElement.textContent).toBe('Send message');
                        expect(submitButton.nativeElement.type).toBe('submit');
                        expect(submitButton.nativeElement.disabled).toBeTrue();
                    });
                });

                it('displays the submit message button which is enabled when all fields are valid', async () => {
                    // arrange
                    const { find, fixture } = await shallow.render(`<app-contact-editor></app-contact-editor>`);
                    const inputFieldName = find('#name');
                    const inputFieldEmail = find('#email');
                    const textAreaMessage = find('#message');
                    const submitButton = find('#submitButton');

                    inputFieldName.nativeElement.value = 'John Doe';
                    inputFieldEmail.nativeElement.value = 'john.doe@example.org';
                    textAreaMessage.nativeElement.value = 'I have nothing to say';

                    inputFieldName.triggerEventHandler('input', { target: inputFieldName.nativeElement });
                    inputFieldEmail.triggerEventHandler('input', { target: inputFieldEmail.nativeElement });
                    textAreaMessage.triggerEventHandler('input', { target: textAreaMessage.nativeElement });

                    // act
                    fixture.detectChanges();

                    // assert
                    expect(submitButton.nativeElement.textContent).toBe('Send message');
                    expect(submitButton.nativeElement.type).toBe('submit');
                    expect(submitButton.nativeElement.disabled).toBeFalse();
                });

                it('displays the spinner during sending after send message button is clicked', async () => {
                    // arrange
                    const { fixture, find } = await shallow.render(`<app-contact-editor></app-contact-editor>`);

                    const inputFieldName = find('#name');
                    const inputFieldEmail = find('#email');
                    const textAreaMessage = find('#message');

                    const submitButton = find('#submitButton');

                    // -- enter some values so that the form is valid
                    inputFieldName.nativeElement.value = 'John Doe';
                    inputFieldEmail.nativeElement.value = 'john.doe@example.org';
                    textAreaMessage.nativeElement.value = 'The message';

                    inputFieldName.triggerEventHandler('input', { target: inputFieldName.nativeElement });
                    inputFieldEmail.triggerEventHandler('input', { target: inputFieldEmail.nativeElement });
                    textAreaMessage.triggerEventHandler('input', { target: textAreaMessage.nativeElement });

                    // act, assert
                    // -- when the form is valid, the button is enabled
                    fixture.detectChanges();
                    submitButton.nativeElement.click();
                    fixture.detectChanges();

                    // -- after clicking the button it is disabled, the loading spinner is displayed and the fields are read-only
                    expect(inputFieldName.nativeElement.readOnly).toBeTrue();
                    expect(inputFieldEmail.nativeElement.readOnly).toBeTrue();
                    expect(textAreaMessage.nativeElement.readOnly).toBeTrue();

                    expect(submitButton.nativeElement.disabled).toBeTrue();
                    let loadingSpinner = find('#loadingSpinner');
                    expect(loadingSpinner).toHaveFound(1)
                    expect(submitButton.nativeElement.textContent).toBe('Send message');

                    await fixture.whenStable(); // Waits for all promises to resolve

                    // -- once the promise is resolved, the spinner is hidden and hte input fields are editable
                    fixture.detectChanges();
                    loadingSpinner = find('#loadingSpinner');
                    expect(loadingSpinner).toHaveFound(0)
                    expect(inputFieldName.nativeElement.readOnly).toBeFalse();
                    expect(inputFieldEmail.nativeElement.readOnly).toBeFalse();
                    expect(textAreaMessage.nativeElement.readOnly).toBeFalse();
                });
            });

            describe('form validations', () => {
                [
                    {
                        inputFieldId: '#name',
                        expectedValidationError: { required: true },
                    },
                    {
                        inputFieldId: '#email',
                        expectedValidationError: { required: true },
                    },
                    {
                        inputFieldId: '#message',
                        expectedValidationError: { required: true },
                    },
                ].forEach(params => {
                    it('displays required validation error', async () => {
                        // arrange
                        const { find, instance } = await shallow.render(`<app-contact-editor></app-contact-editor>`);
                        const form = instance.contactEditorForm;
                        const inputField = find(params.inputFieldId);

                        // assert
                        expect(inputField.nativeElement.textContent).toBe('');
                        expect(form.name?.errors).toEqual(params.expectedValidationError);
                    });
                });

                it('displays the email validation error', async () => {
                    // arrange
                    const { find, instance } = await shallow.render(`<app-contact-editor></app-contact-editor>`);
                    const form = instance.contactEditorForm;
                    const inputField = find('#email');

                    // act
                    inputField.nativeElement.value = 'It works!';
                    inputField.triggerEventHandler('input', { target: inputField.nativeElement });

                    // assert
                    expect(inputField.nativeElement.value).toBe('It works!');
                    expect(form.email?.errors).toEqual({ email: true });
                });
            });
        });
    });
});