import { listeners, callback } from './types';

class EventBus {
    listeners: listeners;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: callback): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: callback): void {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event] = this.listeners[event]
            .filter((itemCallback) => callback !== itemCallback);
    }

    emit(event: string, ...args: unknown[]): void {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach((callback) => {
            callback(...args);
        });
    }
}

export {
    EventBus,
};
