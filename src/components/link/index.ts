import './link.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view';
import { LinkProps, HandlerCallback } from './types';

import template from './link.hbs';

export class LinkComponent extends Component<LinkProps> {
    getHandler(name: string): HandlerCallback | null {
        const handlers = this.props.handlers;

        if (handlers && Object.prototype.hasOwnProperty.call(handlers, name)) {
            return handlers[name];
        }

        return null;
    }

    componentDidRender(): void {
        const handler = this.getHandler('click');

        if (handler) {
            this.getContent()
                ?.addEventListener('click', handler);
        }
    }

    componentWillRender(): void {
        const handler = this.getHandler('click');

        if (handler) {
            this.getContent()
                ?.removeEventListener('click', handler);
        }
    }

    render(): HTMLElement {
        return toDomTree(template<LinkProps>(this.props));
    }
}
