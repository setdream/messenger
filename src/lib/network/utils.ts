import config from '@root/config';

import { RequestOptions, RESPONSE_TYPE, ErrorResponse } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasErrorResponse(response: any): response is ErrorResponse {
    return response && 'reason' in response;
}

export function createApiPathGenerator(api: string) {
    return (path: string): string => {
        return `${config.API_HOST}${api}${path}`;
    };
}

export function jsonConfig(options: Partial<RequestOptions> = {}): Partial<RequestOptions> {
    return Object.assign(options, {
        responseType: RESPONSE_TYPE.JSON,
        headers: [
            ['content-type', 'application/json'],
            ['accept', 'application/json'],
        ],
        data: options.data && JSON.stringify(options.data),
    });
}

export function fileConfig(options: Partial<RequestOptions> = {}): Partial<RequestOptions> {
    return Object.assign(options, {
        responseType: RESPONSE_TYPE.JSON,
        headers: [
            ['accept', 'application/json'],
        ],
    });
}

export async function processErrors(xhr: XMLHttpRequest): Promise<XMLHttpRequest> {
    if (hasErrorResponse(xhr.response)) {
        throw new Error(xhr.response.reason);
    }

    throw new Error('Unknow Error');
}

export async function processResponseStatus(
    xhr: XMLHttpRequest,
    allowedStatus: number[] = []
): Promise<XMLHttpRequest> {
    if (!allowedStatus.includes(xhr.status)) {
        if (hasErrorResponse(xhr.response)) {
            throw new Error(xhr.response.reason);
        }

        throw new Error('Network Error');
    }

    return xhr;
}

export async function allow200Status(xhr: XMLHttpRequest): Promise<XMLHttpRequest> {
    return processResponseStatus(xhr, [200]);
}

export async function getJsonResponse<T>(xhr: XMLHttpRequest): Promise<T> {
    return xhr.response as T;
}
