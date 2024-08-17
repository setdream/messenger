import * as UserApi from '@api/user';
import { User, UserSearchParameters } from '@api/user/types';
import { userDataMiddleware } from '@api/user/utils';
import authStore from '@stores/auth/auth.store';
import { AuthStoreState } from '@stores/auth/types';

export function searchUsers(data: UserSearchParameters): Promise<User[]> {
    return UserApi.searchUsers(data);
}

export function getUserFieldValue(field: keyof User): null | string | number | undefined {
    const authState = authStore.getState() as AuthStoreState;

    if (!Object.prototype.hasOwnProperty.call(authState.user, field)) {
        return null;
    }

    return authState.user[field];
}

export function saveUserField(field: keyof User, value: string): Promise<void> {
    const authState = authStore.getState() as AuthStoreState;

    return UserApi.saveUserProfile(
        Object.assign(authState.user, {
            [field]: value,
        }))
        .then(userDataMiddleware)
        .then((user) => {
            if (user) {
                authStore.set('user', user);
            }
        });
}

export function changeUserPassword(oldPassword: string, newPassword: string): Promise<void> {
    return UserApi.changeUserPassword({
        oldPassword,
        newPassword,
    });
}

export function saveUserAvatar(data: FormData): Promise<User | null> {
    return UserApi.saveUserAvatar(data)
        .then(userDataMiddleware)
        .then((user) => {
            if (user) {
                authStore.set('user', user);
            }

            return user;
        });
}

export function getUserById(userId: number): Promise<User | null> {
    return UserApi.getUserById({ id: userId })
        .then(userDataMiddleware);
}
