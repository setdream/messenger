import './message-field.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { MessageField } from './types';

import template from './message-field.hbs';

export class MessageFieldComponent extends Component<MessageField> {
    onKeyUp(e: KeyboardEvent): void {
        if (e.key === 'Enter' && !e.shiftKey) {
            const text = this.getValue();

            this.clear();

            this.props.onMessageSubmit(text);
        }
    }

    clear(): void {
        const field = this.getContent()
            ?.querySelector<HTMLElement>('[data-role-message-field]');

        if (field) {
            field.textContent = '';
        }
    }

    getValue(): string {
        const field = this.getContent()
            ?.querySelector<HTMLElement>('[data-role-message-field]');

        return field?.textContent || '';
    }

    componentDidRender(): void {
        this.getContent()
            ?.querySelector<HTMLInputElement>('[data-role-message-field]')
            ?.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.querySelector<HTMLInputElement>('[data-role-message-field]')
            ?.removeEventListener('keyup', this.onKeyUp.bind(this));
    }

    render(): HTMLElement {
        return toDomTree(template<MessageField>(this.props));
    }
}
