import { create, navigate } from '@lib/router';

import { ConverstionPage } from '@pages/conversation';

import { HeaderInnerComponent, Theme } from '@components/header';
import { MenuComponent } from '@components/menu';
import { LinkComponent } from '@components/link';
import {
    ConverstionComponent,
    MessageFieldComponent,
    MessageComponent,
} from '@modules/conversation';

import { Sender } from '@modules/conversation/components/message/types';

import { signOut } from '@services/auth.service';
import { getToken, removeConversation } from '@services/chat.service';
import { getUser } from '@stores/auth/auth.store';

import { ChatConnector } from '@modules/chats/components/connector';

import { ConversationPageParameters } from '@pages/conversation/types';
import { getAppContainer } from '@routes/utils';

function getMenu(chatId: number): MenuComponent {
    const menu = new MenuComponent({
        links: [
            new LinkComponent({
                title: 'Chats',
                handlers: {
                    click: () => {
                        menu.hide();
                        navigate('/');
                    },
                },
            }),
            new LinkComponent({
                title: 'Profile',
                handlers: {
                    click: () => {
                        menu.hide();
                        navigate('/profile');
                    },
                },
            }),
            new LinkComponent({
                title: 'Remove Chat',
                handlers: {
                    click: () => {
                        removeConversation(chatId)
                            .finally(() => navigate('/'));
                    },
                },
            }),
            new LinkComponent({
                title: 'Logout',
                handlers: {
                    click: () => {
                        menu.hide();
                        navigate('/');
                        signOut();
                    },
                },
            }),
        ],
    });

    return menu;
}

export const conversationRoute = create(
    /^\/conversation\/(?<id>[\d]+)$/,
    async ({ pathData }
    ): Promise<ConverstionPage> => {
        const user = getUser();
        const chatId = Number((pathData as ConversationPageParameters).id);

        if (!user) {
            throw Error('No user Data');
        }

        const token = await getToken(chatId);
        const connector = new ChatConnector(chatId, user.id, token);

        const conversation = new ConverstionComponent({
            messages: [],
            // eslint-disable-next-line max-params
            onMessagesAdded: (messages, hasMaxMessages, isOldMessages, self) => {
                self.setProps({
                    messages: messages.map((message) => {
                        const isMyMessage = Number(message.user_id) === user.id;

                        return new MessageComponent({
                            sender: isMyMessage ? Sender.ME : Sender.BUDDY,
                            text: message.content,
                            time: new Date(message.time).toDateString(),
                        });
                    }),
                });

                if (isOldMessages) {
                    self.setProps({
                        hasLoadMoreButton: hasMaxMessages,
                    });
                }
            },
            onLoadMoreClick: (offset) => {
                connector.getOldMessages(offset);
            },
        });

        connector.addOldMessagesListener((messages) => conversation.addMessages(messages, true));
        connector.addMessageListener((message) => conversation.addMessages([message], false));

        connector.getOldMessages(conversation.getCurrentOffset());

        const menu = getMenu(chatId);

        return new ConverstionPage({
            header: new HeaderInnerComponent({
                title: 'Profile',
                avatar: user?.avatar,
                theme: Theme.DARK,
                onBackButtonClick: () => {
                    navigate('/chats');
                },
                menu,
            }),
            conversation,
            messageField: new MessageFieldComponent({
                placeholder: 'Type your message...',
                onMessageSubmit: (message) => {
                    connector.sendMessage(message);
                },
            }),
            onDestroyed: () => {
                connector.close();
            },
            menu,
        });
    }, getAppContainer);
