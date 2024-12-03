import { AbstractControl } from "@angular/forms";

export interface AbstractForm<T> {
    initForm(model?: T): void;
    updateModel(model: T): void;
    isControlInvalid(control: AbstractControl | null): boolean
}