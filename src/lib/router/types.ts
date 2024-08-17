import { Component } from '@lib/view';

export type ArgsData = {
    [key: string]: unknown
};

export type componentGenerator<T extends Record<string, unknown>> =
    (data: ArgsData) => Promise<Component<T>>;

export type Route<T extends Record<string, unknown>> = {
    path: string | string[] | RegExp,
    createComponent: componentGenerator<T>,
    getContainer: () => HTMLElement,
    component?: Component<T>
};
