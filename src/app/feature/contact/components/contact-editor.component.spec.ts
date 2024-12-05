import { Shallow } from 'shallow-render';
import { ContactEditorComponent } from './contact-editor.component';
import { ContactModule } from '../contact.module';
import { Sender } from '../models/sender';
import { EmailService } from '../services/email-service';

describe('ContactEditorComponent', () => {
    let shallow: Shallow<ContactEditorComponent>;

    beforeEach(() => {
        shallow = new Shallow(ContactEditorComponent, ContactModule);
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
            const { instance, fixture } = await shallow
                .mock(EmailService, {
                    sendEmail: () => Promise.resolve({ status: 200, text: 'OK' })
                })
                .render({ bind: { sender } });
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

        it('sends an email and resets the form', async () => {
            // arrange
            const sender: Sender = { name: '', email: '', message: '' };

            const { inject, instance, fixture } = await shallow
                .mock(EmailService, {
                    sendEmail: () => Promise.resolve({ status: 200, text: 'OK' })
                })
                .render({ bind: { sender } });
            await fixture.whenStable(); // Waits for all promises to resolve

            const emailServiceMock = inject(EmailService);

            const resetSpy = spyOn(instance.contactEditorForm.formGroup, 'reset').and.callThrough();

            // act
            instance.onSubmit();
            await Promise.resolve();

            // assert
            expect(emailServiceMock.sendEmail).toHaveBeenCalled();
            expect(resetSpy).toHaveBeenCalled();
        });
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

                        // act
                        inputField.triggerEventHandler('click', inputField.nativeElement);

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
