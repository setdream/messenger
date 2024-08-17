import { EventBus } from '@lib/observer';
import { set } from './utils';

import { Indexed, StoreEvents } from './types';

export class Store extends EventBus {
    private state: Indexed = {};

    public getState(): Indexed {
        return this.state;
    }

    public set(path: string, value: unknown): void {
        set(this.state, path, value);

        this.emit(StoreEvents.UPDATED);
    }
}
