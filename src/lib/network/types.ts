export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export enum RESPONSE_TYPE {
    JSON = 'json',
}

export type RequestOptions = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    responseType?: RESPONSE_TYPE,
    headers?: [string, string][];
}

export type ErrorResponse = {
    reason?: string;
}
