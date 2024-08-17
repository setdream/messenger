import { v4 as makeUUID } from 'uuid';

import { EventBus } from '@lib/observer';
import {
    EVENT_COMPONENT_WILL_RENDER,
    EVENT_COMPONENT_DID_RENDER,
    EVENT_COMPONENT_DID_UPDATE,
    EVENT_COMPONENT_RENDER,
    EVENT_COMPONENT_CHANGE_VISIBILITY,
    EVENT_COMPONENT_DESTROYED,
} from './constants/events';

export interface ComponentConstructor<T> {
    new(props: T): ComponentInterface<T>;
}

export interface ComponentInterface<T> {
    render(): HTMLElement;
    getEventBus: () => EventBus;
    getContent: () => HTMLElement | undefined;
    setProps: (nextProps: Partial<T>) => void;
}

// eslint-disable-next-line max-len
export abstract class Component<T extends Record<string, unknown>> implements ComponentInterface<T> {
    private readonly _eventBus: EventBus = new EventBus();
    private _element?: HTMLElement;
    private _props: T;
    private _id: string = makeUUID();

    abstract render(): HTMLElement;

    getEventBus(): EventBus {
        return this._eventBus;
    }

    getContent(): HTMLElement | undefined {
        return this._element;
    }

    find<E extends HTMLElement>(selector: string): E | null {
        if (!this.element) {
            return null;
        }

        return this.element.querySelector<E>(selector);
    }

    setProps(nextProps: Partial<T>): void {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    toString(): string {
        return `<div data-component-id="${this._id}"></div>`;
    }

    get props(): T {
        return this._props;
    }

    get id(): string {
        return this._id;
    }

    get element(): HTMLElement | undefined {
        return this._element;
    }

    private set visible(isVisible: boolean) {
        if (this.element) {
            this.element.hidden = !isVisible;

            this.getEventBus().emit(EVENT_COMPONENT_CHANGE_VISIBILITY, isVisible);
        }
    }

    show(): void {
        this.visible = true;
    }

    hide(): void {
        this.visible = false;
    }

    constructor(props: T) {
        this._props = this._makePropsProxy({ ...props });

        this.registerEvents();

        this.getEventBus().emit(EVENT_COMPONENT_RENDER);
    }

    private registerEvents(): void {
        const eventBus = this.getEventBus();

        eventBus.on(EVENT_COMPONENT_WILL_RENDER, this._componentWillRender.bind(this));
        eventBus.on(EVENT_COMPONENT_DID_RENDER, this._componentDidRender.bind(this));
        eventBus.on(EVENT_COMPONENT_DID_UPDATE, this._componentDidUpdate.bind(this));
        eventBus.on(EVENT_COMPONENT_RENDER, this._render.bind(this));
    }

    private _componentWillRender(): void {
        this.componentWillRender();
    }

    private _componentDidRender(): void {
        this._compileSubComponents();
        this.componentDidRender();
    }

    private _componentDidUpdate(newProps: T, oldProps: T): void {
        const result = this.componentDidUpdate(newProps, oldProps);

        if (result) {
            this.getEventBus().emit(EVENT_COMPONENT_RENDER);
        }
    }

    componentWillRender(): void {
        return;
    }

    componentDidRender(): void {
        return;
    }

    componentDidUpdate(newProps: T, oldProps: T): boolean {
        return JSON.stringify(newProps) !== JSON.stringify(oldProps);
    }

    private _render() {
        this.getEventBus().emit(EVENT_COMPONENT_WILL_RENDER);

        const element = this.render();

        if (this._element) {
            this._element.replaceWith(element);
        }

        this._element = element;

        this.getEventBus().emit(EVENT_COMPONENT_DID_RENDER);
    }

    private _makePropsProxy(props: T): T {
        const eventBus = this.getEventBus();

        return new Proxy(props, {
            // eslint-disable-next-line max-params
            set(target, prop, value, reciever) {
                const oldProps = { ...target };
                const result = Reflect.set(target, prop, value, reciever);

                if (result) {
                    eventBus.emit(EVENT_COMPONENT_DID_UPDATE, { ...target }, oldProps);
                }

                return result;
            },
        });
    }

    private _compileSubComponents() {
        // eslint-disable-next-line max-len
        const extractComponents = (props: T[keyof T][]): Component<T>[] => {
            return props.reduce((acc: Component<T>[], prop: T[keyof T]) => {
                if (prop instanceof Component) {
                    return [...acc, prop as Component<T>];
                }

                if (Array.isArray(prop)) {
                    return [...acc, ...extractComponents(prop)];
                }

                return acc;
            }, []);
        };

        const components = extractComponents(Object.values(this.props) as T[keyof T][]);

        if (components.length > 0) {
            components.forEach((component) => {
                const element = component.getContent();

                if (element) {
                    const container = this.getContent()
                        ?.querySelector(`[data-component-id="${component.id}"]`);

                    container?.replaceWith(element);
                }
            });
        }
    }

    public destroy(): void {
        this.getContent()?.remove();
        this.getEventBus().emit(EVENT_COMPONENT_DESTROYED);
    }
}
