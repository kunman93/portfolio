export interface AbstractForm<T> {
    initForm(model?: T): void;
    updateModel(model: T): void;
}