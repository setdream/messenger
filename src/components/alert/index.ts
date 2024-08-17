import './alert.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view';

import { AlertProps } from './types';

import template from './alert.hbs';
import { render, hide, show } from '@lib/view/utils';

export class AlertComponent extends Component<AlertProps> {
    onCloseClick(e: Event): void {
        e.preventDefault();

        hide(this);
    }

    componentDidRender(): void {
        this.getContent()
            ?.querySelector('.alert-close-button')
            ?.addEventListener('click', this.onCloseClick.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.querySelector('.alert-close-button')
            ?.removeEventListener('click', this.onCloseClick.bind(this));
    }

    render(): HTMLElement {
        return toDomTree(template<AlertProps>(this.props));
    }
}

export const globalAlertComponent = ((alertComponent: AlertComponent | null = null) => {
    return () => {
        if (!alertComponent) {
            alertComponent = new AlertComponent({
                title: '',
                message: '',
            });
            hide(alertComponent);
        }

        return alertComponent;
    };
})();

export function initGlobalAlertComponent(container: HTMLElement): void {
    render(globalAlertComponent(), container);
}

export function showAlert(title: string, message: string): void {
    globalAlertComponent().setProps({
        title,
        message,
    });

    show(globalAlertComponent());
}

export function showAlertError(message: string): void {
    showAlert('Error', message);
}

export function hideAlert(): void {
    hide(globalAlertComponent());
}
