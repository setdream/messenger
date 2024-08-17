import { create, navigate } from '@lib/router';

import { ProfilePage } from '@pages/profile';

import {
    UserInfoComponent,
    UserInfoFieldComponent,
} from '@modules/profile';
import { HeaderInnerComponent, Theme } from '@components/header';

import { showAlertError } from '@components/alert';
import { globalLoadingPage } from '@pages/loading';

import { saveUserAvatar } from '@services/user.service';
import { getUser } from '@stores/auth/auth.store';

import { show, hide } from '@lib/view/utils';
import { getProfileMenu } from './utils';
import { getAppContainer } from '@routes/utils';

export const profileRoute = create('/profile', async (): Promise<ProfilePage> => {
    const menu = getProfileMenu();
    const user = getUser();

    if (!user) {
        throw new Error('No user data');
    }

    return new ProfilePage({
        header: new HeaderInnerComponent({
            title: 'Profile',
            avatar: user.avatar,
            theme: Theme.LIGHT,
            onBackButtonClick: () => {
                navigate('/chats');
            },
            menu,
        }),
        userInfo: new UserInfoComponent({
            first_name: new UserInfoFieldComponent({
                value: user.first_name,
                editTitle: 'Tap to edit First Name',
                onTap: () => navigate('/profile/edit/first_name'),
            }),
            second_name: new UserInfoFieldComponent({
                value: user.second_name,
                editTitle: 'Tap to edit Second Name',
                onTap: () => navigate('/profile/edit/second_name'),
            }),
            email: new UserInfoFieldComponent({
                value: user.email,
                editTitle: 'Tap to edit Email',
                onTap: () => navigate('/profile/edit/email'),
            }),
            phone: new UserInfoFieldComponent({
                value: user.phone,
                editTitle: 'Tap to edit Phone',
                onTap: () => navigate('/profile/edit/phone'),
            }),
            display_name: new UserInfoFieldComponent({
                value: user.display_name,
                editTitle: 'Tap to edit Display Name',
                onTap: () => navigate('/profile/edit/display_name'),
            }),
            image: user.avatar,
            onImageChanged: async (data: FormData, file: File, self: UserInfoComponent) => {
                show(await globalLoadingPage());

                saveUserAvatar(data)
                    .then(() => {
                        self.setProps({
                            image: URL.createObjectURL(file),
                        });
                    })
                    .catch((reason) => {
                        if (reason instanceof Error) {
                            showAlertError(reason.message);
                        }
                    })
                    .finally(async () => {
                        hide(await globalLoadingPage());
                    });
            },
        }),
        menu,
    });
}, getAppContainer);
