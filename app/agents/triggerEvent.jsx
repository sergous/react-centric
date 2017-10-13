export const triggerEvent = {
    body(type, payload) {
        const body = $('body');
        body.trigger(type, payload);
    }
}