import { Component } from '@lib/view';

export function render<T extends Record<string, unknown>>(
    component: Component<T>,
    container: HTMLElement
): void {
    const element = component?.getContent();

    if (element) {
        container.appendChild(element);
    }
}

export function isRenderedIn<T extends Record<string, unknown>>(
    component: Component<T>,
    container: HTMLElement
): boolean {
    return Array.from(container.children).some((children) => {
        return children === component.element;
    });
}

export function hide<T extends Record<string, unknown>>(component: Component<T>): void {
    component.hide();
}

export function show<T extends Record<string, unknown>>(component: Component<T>): void {
    component.show();
}

export function removeFromContainer<T extends Record<string, unknown>>(
    component: Component<T>,
    container: HTMLElement
): void {
    const element = component.getContent();

    if (element) {
        container.removeChild(element);
    }
}
