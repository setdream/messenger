import { Component } from '@lib/view';
import { Store } from '@lib/store';

import { callback } from '@lib/observer/types';
import { User } from '@api/user/types';
import { StoreEvents } from '@lib/store/types';

const authStore = new Store();

export function updateUser(user: User | null): void {
    authStore.set('user', user);
}

export function getUser(): User | null {
    const user = authStore.getState()?.user;

    if (!user) {
        return null;
    }

    return user as User;
}

export const addUpdateListener = (cb: callback): void => {
    authStore.on(StoreEvents.UPDATED, cb);
};

export function connectToStore<T extends Record<string, unknown>>(
    component: Component<T>, store: Store): void {
    store.on(StoreEvents.UPDATED, (state: Partial<T>) => {
        component.setProps(state);
    });
}

export default authStore;
