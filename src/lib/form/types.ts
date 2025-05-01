export type FormEvent = SubmitEvent & { currentTarget: EventTarget & HTMLFormElement };

export type FormSubmitAction<T> = {
    callback: (data: T) => void,
    pending: boolean,
}
