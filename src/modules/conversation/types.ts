import { Component } from '@lib/view';
import { ChatIncomingData } from '@modules/chats/components/connector/types';
import { MessageComponent } from './components/message';

export type ConversationProps = {
    messages: MessageComponent[],
    hasLoadMoreButton?: boolean,
    onMessagesAdded: (
        messages: ChatIncomingData[],
        hasMaxMessages: boolean,
        isOldMessages: boolean,
        self: Component<ConversationProps>
    ) => void,
    onLoadMoreClick: (offset: number) => void
}
