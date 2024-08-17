import './chat.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { ChatProps, ChatWithShortNameProps } from './types';

import template from './chat.hbs';

export class ChatComponent extends Component<ChatProps> {
    getShortChatName(name: string): string {
        return `${name.charAt(0).toUpperCase()}`;
    }

    render(): HTMLElement {
        return toDomTree(template<ChatWithShortNameProps>({
            ...this.props,
            shortName: this.getShortChatName(this.props.name),
        }));
    }
}
