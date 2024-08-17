import { navigate } from '@lib/router';

import { MenuComponent } from '@components/menu';
import { LinkComponent } from '@components/link';

import { signOut } from '@services/auth.service';

export function getProfileInnerMenu(): MenuComponent {
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

export function getProfileMenu(): MenuComponent {
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
                title: 'Change Password',
                handlers: {
                    click: () => {
                        menu.hide();
                        navigate('/profile/edit/password');
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
