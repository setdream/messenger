import './chats.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { ChatsProps } from './types';

import template from './chats.hbs';

export { SearchFieldComponent } from '@modules/search/components/search-field';
export { ChatComponent } from './components/chat';

export class ChatsComponent extends Component<ChatsProps> {
    onChatItemClick(e: Event): void {
        const target = e.target;

        if (target instanceof HTMLElement) {
            const userId = target
                ?.closest('article')
                ?.getAttribute('data-role-chat-id');

            if (userId) {
                this.props.onChatItemClick(userId);
            }
        }
    }

    componentDidRender(): void {
        this.getContent()
            ?.querySelector('[data-role-chats-list]')
            ?.addEventListener('click', this.onChatItemClick.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.querySelector('[data-role-chats-list]')
            ?.removeEventListener('click', this.onChatItemClick.bind(this));
    }

    render(): HTMLElement {
        return toDomTree(template<ChatsProps>(this.props));
    }
}
