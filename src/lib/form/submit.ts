import { applyAction, deserialize } from "$app/forms";
import { invalidateAll } from "$app/navigation";
import type { ActionResult } from "@sveltejs/kit";
import type { FormEvent, FormSubmitAction } from "./types";

export const handleFormSubmit = async <T>(event: FormEvent, action: FormSubmitAction<T>) => {
    event.preventDefault();
    action.pending = true;

    const target = event.currentTarget;
    const data = new FormData(target);

    const response = await fetch(target.action, {
        method: 'POST',
        body: data,
    })
    const result: ActionResult = deserialize(await response.text());

    if (result.type === 'success') {
        const data: T | undefined = result.data as T;

        action.callback(data);
        await invalidateAll();
    }

    action.pending = false;
    applyAction(result);
}
