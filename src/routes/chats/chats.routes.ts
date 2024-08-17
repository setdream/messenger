import { create, navigate } from '@lib/router';

import { ChatsPage } from '@pages/chats';
import { ChatsComponent, ChatComponent } from '@modules/chats';
import { HeaderCommonComponent } from '@components/header';
import { MenuComponent } from '@components/menu';
import { LinkComponent } from '@components/link';

import { signOut } from '@services/auth.service';
import { getChats } from '@services/chat.service';
import { getUser } from '@stores/auth/auth.store';

import { Message } from '@api/chat/types';
import { getChatTime } from '@modules/chats/utils';
import { getAppContainer } from '@routes/utils';

function getMenu(): MenuComponent {
    const menu = new MenuComponent({
        links: [
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

export const chatsRoute = create(['/', '/chats'], async (): Promise<ChatsPage> => {
    const user = getUser();
    const menu = getMenu();

    const chats = (await getChats({
        title: '',
    })).map((chat) => {
        const message = chat.last_message as Message;

        return new ChatComponent({
            chatId: chat.id,
            avatar: chat?.avatar,
            name: chat.title,
            short: message?.content || 'No messages',
            time: getChatTime(message?.time),
        });
    });

    return new ChatsPage({
        list: new ChatsComponent({
            chats,
            onChatItemClick: (chatId) => {
                navigate(`/conversation/${chatId}`);
            },
        }),
        header: new HeaderCommonComponent({
            title: 'Messages',
            avatar: user?.avatar,
            notificationCount: 0,
            menu,
            onSearchButtonClick: () => {
                navigate('/search');
            },
        }),
        menu,
    });
}, getAppContainer);
