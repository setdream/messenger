import './message.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { MessageProps } from './types';

import template from './message.hbs';

export class MessageComponent extends Component<MessageProps> {
    render(): HTMLElement {
        return toDomTree(template<MessageProps>(this.props));
    }
}
