class EventEmitter<T> {
  private listeners: ((data: T) => void)[] = [];

  subscribe(listener: (data: T) => void): void {
    this.listeners.push(listener);
  }

  unsubscribe(listener: (data: T) => void): void {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  emit(data: T): void {
    for (const listener of this.listeners) {
      listener(data);
    }
  }
}

export default EventEmitter;