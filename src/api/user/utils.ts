import { User } from '@api/user/types';
import { createApiPathGenerator } from '@lib/network/utils';

const generateResourcesPath = createApiPathGenerator('/api/v2/resources/');

export function processUserData(user: User): User {
    return Object.assign(user, {
        avatar: user.avatar ?
            `${generateResourcesPath(user.avatar)}` :
            null,
    });
}

export function userDataMiddleware(user: User | null): User | null {
    return user ? processUserData(user) : null;
}
