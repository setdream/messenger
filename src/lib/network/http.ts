import { METHOD, RequestOptions } from './types';

export function request(
    url: string,
    method: METHOD,
    options?: RequestOptions
): Promise<XMLHttpRequest> {
    const {
        data = null,
        headers = null,
        responseType = null,
    } = options || {};

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.withCredentials = true;

        if (responseType) {
            xhr.responseType = responseType;
        }

        if (Array.isArray(headers)) {
            headers.forEach(([header, value]) => {
                xhr.setRequestHeader(header, value);
            });
        }

        xhr.onload = () => resolve(xhr);

        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;

        if (method === METHOD.GET || !data) {
            xhr.send();
        } else if (data) {
            xhr.send(data);
        }
    });
}


export function get(url: string, options?: RequestOptions): Promise<XMLHttpRequest> {
    return request(url, METHOD.GET, options);
}

export function post(url: string, options?: RequestOptions): Promise<XMLHttpRequest> {
    return request(url, METHOD.POST, options);
}

export function put(url: string, options?: RequestOptions): Promise<XMLHttpRequest> {
    return request(url, METHOD.PUT, options);
}

export function del(url: string, options?: RequestOptions): Promise<XMLHttpRequest> {
    return request(url, METHOD.DELETE, options);
}
