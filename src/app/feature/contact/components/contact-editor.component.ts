import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sender } from '../models/sender';
import { AbstractForm } from 'shared/models/abstract-form';
import { ToastService } from 'src/app/core/notification/services/toast.service';
import { ToastType } from 'src/app/core/notification/models/toast-type';
import { EmailService } from '../services/email.service';

class ContactEditorForm implements AbstractForm<Sender> {
    private form: FormGroup = new FormGroup({
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        message: new FormControl(null, Validators.required)
    });

    initForm(model?: Sender): void {
        this.form.patchValue({
            name: model?.name,
            email: model?.email,
            message: model?.message
        });
    }

    updateModel(model: Sender): void {
        model.name = this.name?.value;
        model.email = this.email?.value;
        model.message = this.message?.value;
    }

    isControlInvalid(control: AbstractControl | null): boolean {
        return !!control && control.invalid && (control.dirty || control.touched);
    }

    get formGroup() {
        return this.form;
    }

    get name() {
        return this.form.get('name');
    }

    get email() {
        return this.form.get('email');
    }

    get message() {
        return this.form.get('message');
    }
}

@Component({
    selector: 'app-contact-editor',
    templateUrl: './contact-editor.component.html',
    styleUrl: './contact-editor.component.scss'
})
export class ContactEditorComponent implements OnInit {
    @Input() sender: Sender = { name: '', email: '', message: '' };

    contactEditorForm = new ContactEditorForm();

    isSending = false;

    constructor(
        private emailService: EmailService,
        private toastService: ToastService
    ) {
    }

    ngOnInit(): void {
        this.contactEditorForm.initForm(this.sender);
    }

    onSubmit(): void {
        this.isSending = true;
        this.contactEditorForm.updateModel(this.sender);
        this.emailService.sendEmail(this.sender)
            .then(() => {
                this.contactEditorForm.formGroup.reset();
                this.isSending = false;
                this.toastService.add({
                    type: ToastType.SUCCESS,
                    message: "Your message has been sent."
                });
            },
                () => {
                    this.toastService.add({
                        type: ToastType.ERROR,
                        message: "Something went wrong, try again later."
                    });
                }
            );
    }
}
