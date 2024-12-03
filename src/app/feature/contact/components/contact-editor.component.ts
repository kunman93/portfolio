import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sender } from '../models/sender';
import { AbstractForm } from 'shared/models/abstract-form';

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
    @Input() sender!: Sender;
    contactEditorForm = new ContactEditorForm();

    ngOnInit(): void {
        this.contactEditorForm.initForm(this.sender);
    }

    onSubmit(): void {
        this.contactEditorForm.updateModel(this.sender);
        this.contactEditorForm.formGroup.reset();
    }

    getButtonColor(isFormValid: boolean) {
        const buttonStyleValid = { 'hover:scale-110 bg-gradient-to-b from-emerald-800 to-emerald-900': isFormValid };
        const buttonStyleInvalid = { 'opacity-80 bg-gradient-to-b from-stone-800 to-stone-900': !isFormValid };

        return isFormValid ? buttonStyleValid : buttonStyleInvalid;
    }
}
