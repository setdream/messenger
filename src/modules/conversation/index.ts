import './conversation.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { ConversationProps } from './types';

import template from './conversation.hbs';
import { ChatIncomingData } from '@modules/chats/components/connector/types';

export { MessageFieldComponent } from './components/message-field';
export { MessageComponent } from './components/message';

export const EVENT_MESSAGE_ADDED = 'message:added';
export const MAX_MESSAGES_LENGTH = 20;

export class ConverstionComponent extends Component<ConversationProps> {
    private messages: ChatIncomingData[] = [];
    private currentOffset = 0;

    private nextOffset(): void {
        this.currentOffset += MAX_MESSAGES_LENGTH;
    }

    getCurrentOffset(): number {
        return this.currentOffset;
    }

    sortMessagesByDate(messages: ChatIncomingData[]): ChatIncomingData[] {
        messages.sort((a, b) => {
            return (new Date(a.time)).getTime() > (new Date(b.time)).getTime() ?
                1 :
                -1;
        });

        return messages;
    }

    addMessages(messages: ChatIncomingData[], isOldMessages: boolean): void {
        this.messages = this.sortMessagesByDate([...this.messages, ...messages]);

        this.props.onMessagesAdded(
            this.messages,
            messages.length === MAX_MESSAGES_LENGTH,
            isOldMessages,
            this
        );
    }

    onLoadMoreClick(): void {
        this.nextOffset();

        this.props.onLoadMoreClick(this.getCurrentOffset());
    }

    componentDidRender(): void {
        this.getContent()
            ?.querySelector('[data-role-load-more]')
            ?.addEventListener('click', this.onLoadMoreClick.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.querySelector('[data-role-load-more]')
            ?.removeEventListener('click', this.onLoadMoreClick.bind(this));
    }

    render(): HTMLElement {
        return toDomTree(template<ConversationProps>(this.props));
    }
}


