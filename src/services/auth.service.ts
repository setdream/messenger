import * as AuthApi from '@api/auth';
import { User } from '@api/user/types';
import { userDataMiddleware } from '@api/user/utils';
import { SignUpFormData } from '@components/auth/types';

import authStore from '@stores/auth/auth.store';

export function signIn(login: string, password: string): Promise<void> {
    return AuthApi.signIn({
        login,
        password,
    })
        .then(userDataMiddleware)
        .then((data) => authStore.set('user', data));
}

export function signUp({
    email,
    password,
    phone,
    first_name,
    second_name,
}: SignUpFormData): Promise<void> {
    return AuthApi.signUp({
        login: email,
        password,
        email,
        phone,
        first_name,
        second_name,
        display_name: email,
    })
        .then(userDataMiddleware)
        .then((data) => {
            authStore.set('user', data);
        });
}

export async function signOut(): Promise<void> {
    return AuthApi
        .logout()
        .then(() => {
            authStore.set('user', null);
        });
}

export async function isSignedIn(): Promise<boolean> {
    return Boolean(authStore.getState().user);
}

export async function tryGetAuthUserAndStore(): Promise<User | null> {
    return AuthApi.getAuthUser()
        .then(userDataMiddleware)
        .then((user) => {
            if (user) {
                authStore.set('user', user);
            }

            return user;
        });
}
