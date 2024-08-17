import { create, navigate } from '@lib/router';

import { SearchPage } from '@pages/search';

import { SearchComponent, FoundUserComponent, SearchFieldComponent } from '@modules/search';
import { HeaderInnerComponent, Theme } from '@components/header';
import { MenuComponent } from '@components/menu';
import { LinkComponent } from '@components/link';
import { LoadingComponent } from '@components/loading';

import { signOut } from '@services/auth.service';
import { searchUsers, getUserById } from '@services/user.service';
import { createConversation } from '@services/chat.service';
import { getUser } from '@stores/auth/auth.store';
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

export const searchUsersRoute = create('/search', async (): Promise<SearchPage> => {
    const user = getUser();
    const menu = getMenu();

    if (!user) {
        throw Error('No user Data');
    }

    const list = new SearchComponent({
        users: [],
        isLoading: false,
        loading: new LoadingComponent({
            title: 'Loading...',
        }),
        onFoundItemCLick: (userId) => {
            getUserById(Number(userId))
                .then((buddy) => {
                    if (buddy) {
                        createConversation(`${buddy.login} and ${user.login}`, Number(userId))
                            .then((chatId) => navigate(`/conversation/${chatId}`));
                    }
                });
        },
    });

    let timerId: number | null = null;

    return new SearchPage({
        list,
        searchField: new SearchFieldComponent({
            placeholder: 'Search...',
            onKeyUp: async (value: string) => {
                if (value.length > 3) {
                    list.setProps({
                        isLoading: true,
                    });

                    if (timerId) {
                        window.clearTimeout(timerId);
                    }

                    timerId = window.setTimeout(async () => {
                        const users = await searchUsers({
                            login: value,
                        });

                        list.setProps({
                            users: users.map((user) => {
                                return new FoundUserComponent(user);
                            }),
                            isLoading: false,
                        });

                        timerId = null;
                    }, 1500);
                } else {
                    list.setProps({
                        isLoading: false,
                        users: [],
                    });
                }
            },
        }),
        header: new HeaderInnerComponent({
            title: 'Search',
            avatar: user?.avatar,
            theme: Theme.DARK,
            onBackButtonClick: () => {
                navigate('/chats');
            },
            menu,
        }),
        menu,
    });
}, getAppContainer);
