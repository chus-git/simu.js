class EventEmitter {
    constructor() {
        this.listeners = [];
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
    unsubscribe(listener) {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }
    emit(data) {
        for (const listener of this.listeners) {
            listener(data);
        }
    }
}
export default EventEmitter;
