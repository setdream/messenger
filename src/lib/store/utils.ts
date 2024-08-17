import { Indexed } from './types';

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]';
}

function isIndexed(value: unknown): value is Indexed {
    return isObject(value);
}

export function set(
    object: Indexed | unknown,
    path: string, value: unknown
): Indexed | unknown {
    if (!isIndexed(object)) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const pathArray = path.split('.');

    let current = object;

    for (let i = 0; i < pathArray.length; i += 1) {
        const key = pathArray[i];
        const isLast = i === pathArray.length - 1;

        if (!Object.prototype.hasOwnProperty.call(current, key)) {
            current[key] = isLast ? value : {};
        } else if (isLast) {
            current[key] = value;
        }

        if (!isLast) {
            current = current[key] as Indexed;
        }
    }

    return object;
}
