import { put, post, get } from '@lib/network/http';
import {
    UserProfileParameters,
    UserChangePasswordParameters,
    UserSearchParameters,
    GetUserParameters,
} from './types';
import { User } from '@api/user/types';

import {
    createApiPathGenerator,
    jsonConfig,
    fileConfig,
    getJsonResponse,
    allow200Status,
    processErrors,
} from '@lib/network/utils';

const generatePath = createApiPathGenerator('/api/v2/user/');

export function searchUsers(data: UserSearchParameters): Promise<User[]> {
    return post(generatePath('search'), jsonConfig({
        data,
    }))
        .then(allow200Status)
        .then((xhr) => getJsonResponse<User[]>(xhr));
}


export function saveUserProfile(data: UserProfileParameters): Promise<User | null> {
    return put(generatePath('profile'), jsonConfig({
        data,
    }))
        .then(allow200Status)
        .then((xhr) => getJsonResponse<User>(xhr));
}

export function changeUserPassword(data: UserChangePasswordParameters): Promise<void> {
    return put(generatePath('password'), jsonConfig({
        data,
    }))
        .then(allow200Status)
        .then((xhr) => getJsonResponse<void>(xhr));
}

export function saveUserAvatar(data: FormData): Promise<User> {
    return put(generatePath('profile/avatar'), fileConfig({
        data,
    }))
        .catch(processErrors)
        .then(allow200Status)
        .then((xhr) => getJsonResponse<User>(xhr));
}

export function getUserById(data: GetUserParameters): Promise<User> {
    return get(generatePath(`${Number(data.id)}`), jsonConfig())
        .catch(processErrors)
        .then(allow200Status)
        .then((xhr) => getJsonResponse<User>(xhr));
}
