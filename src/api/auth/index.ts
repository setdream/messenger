import { post, get } from '@lib/network/http';
import { SignUpParameters, SignInParameters, SignUpSuccessResponse } from './types';
import { User } from '@api/user/types';

import {
    createApiPathGenerator,
    jsonConfig,
    getJsonResponse,
    allow200Status,
} from '@lib/network/utils';

const generatePath = createApiPathGenerator('/api/v2/auth/');

export function signUp(data: SignUpParameters): Promise<User | null> {
    return post(generatePath('signup'), jsonConfig({
        data,
    }))
        .then(allow200Status)
        .then((xhr) => getJsonResponse<SignUpSuccessResponse>(xhr))
        .then(getAuthUser);
}

export function signIn(data: SignInParameters): Promise<User | null> {
    return post(generatePath('signin'), jsonConfig({
        data,
    }))
        .then(allow200Status)
        .then(getAuthUser);
}

export function logout(): Promise<boolean> {
    return post(generatePath('logout'), jsonConfig())
        .then(allow200Status)
        .then(() => true);
}

export function getAuthUser(): Promise<User | null> {
    return get(generatePath('user'), jsonConfig())
        .then(allow200Status)
        .then((xhr) => getJsonResponse<User>(xhr))
        .catch(() => null);
}
