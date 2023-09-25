declare class EventEmitter<T> {
    private listeners;
    subscribe(listener: (data: T) => void): void;
    unsubscribe(listener: (data: T) => void): void;
    emit(data: T): void;
}
export default EventEmitter;
