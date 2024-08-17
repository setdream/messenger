import { Component } from '@lib/view';
import { render } from '@lib/view/utils';
import { clearChildNodes } from '@lib/dom';

import { Route, componentGenerator, ArgsData } from '@lib/router/types';

let routes: Route<Record<string, unknown>>[] = [];
let activeRoute: Route<Record<string, unknown>> | null = null;

function isEqualPath(path1: string, path2: string): boolean {
    return normilizePath(path1) === normilizePath(path2);
}

function normilizePath(path: string): string {
    return path
        .replace(/\/$/, '')
        .replace(/^\//, '');
}

function findRouteByPath(pathname: string): Route<Record<string, unknown>> | undefined {
    return routes
        .find(({ path }) => {
            if (Array.isArray(path)) {
                return path.some((item) => isEqualPath(item, pathname));
            }

            if (path instanceof RegExp) {
                return path.test(pathname);
            }

            return isEqualPath(path, pathname);
        });
}

function renderComponent<T extends Record<string, unknown>>(
    component: Component<T>, container: HTMLElement): void {
    clearChildNodes(container);
    render(component, container);
}

function tryExtractDataFromPath(path: string | RegExp | string[], urlPath: string): ArgsData {
    if (path instanceof RegExp) {
        const groups = path.exec(urlPath)?.groups;

        if (groups) {
            return groups;
        }
    }

    return {};
}

export function create<T extends Record<string, unknown>>(
    path: string | string[] | RegExp,
    createComponent: componentGenerator<T>,
    getContainer: () => HTMLElement): Route<T> {
    return {
        path,
        createComponent,
        getContainer,
    };
}

export function navigate(pathname: string, data: ArgsData = {}): void {
    showComponentByPathname(pathname, data)
        .then(() => {
            window.history.pushState(data, '', pathname);
        });
}

export function showComponentByPathname(pathname: string, data: ArgsData = {}): Promise<void> {
    const route = findRouteByPath(pathname);

    if (!route) {
        throw new Error('Can\'t find route');
    }

    return route.createComponent({
        ...data,
        pathData: tryExtractDataFromPath(route.path, pathname),
    })
        .then((component) => {
            activeRoute?.component?.destroy();

            renderComponent(component, route.getContainer());

            activeRoute = route;
            activeRoute.component = component;
        });
}

export function setRoutes(routeList: Route<Record<string, unknown>>[]): void {
    routes = routeList;
}

export function startPopStateListener(): void {
    window.addEventListener('popstate', () => {
        showComponentByPathname(window.location.pathname);
    });
}
