import { create, navigate } from '@lib/router';
import { getAppContainer } from '@routes/utils';

import { ProfileEditPage } from '@pages/profile-edit';

import { HeaderInnerComponent, Theme } from '@components/header';
import { showAlertError } from '@components/alert';
import { globalLoadingPage } from '@pages/loading';
import {
    UserFieldComponent,
    UserInfoFormComponent,
} from '@modules/profile';

import { getUserFieldValue, saveUserField } from '@services/user.service';
import { getUser } from '@stores/auth/auth.store';

import { PROFILE_EDIT_FIELDS_ENUM } from '@pages/profile-edit/types';

import { validateEmail, validateName, validatePhone, validateLogin } from '@models/user/validators';
import { show, hide } from '@lib/view/utils';
import { getProfileInnerMenu } from './utils';

export const profileEditFirstNameRoute = create(
    '/profile/edit/first_name',
    async (): Promise<ProfileEditPage> => {
        const user = getUser();
        const menu = getProfileInnerMenu();

        return new ProfileEditPage({
            header: new HeaderInnerComponent({
                title: 'Edit First Name',
                avatar: user?.avatar,
                theme: Theme.LIGHT,
                menu,
                onBackButtonClick: () => {
                    navigate('/profile');
                },
            }),
            form: new UserInfoFormComponent({
                field: new UserFieldComponent({
                    name: PROFILE_EDIT_FIELDS_ENUM.FIRST_NAME,
                    info: 'The First Name should contain of Latin or Russian ' +
                        'letters without spaces, digits and should ' +
                        'start with capital letter.',
                    placeholder: 'Your First Name',
                    value: String(getUserFieldValue(PROFILE_EDIT_FIELDS_ENUM.FIRST_NAME) || ''),
                }, [
                    validateName,
                ]),
                onSubmit: async (value: string) => {
                    show(await globalLoadingPage());

                    saveUserField(PROFILE_EDIT_FIELDS_ENUM.FIRST_NAME, value)
                        .then(async () => {
                            navigate('/profile');
                        })
                        .catch((reason) => {
                            showAlertError(reason);
                        })
                        .finally(async () => {
                            hide(await globalLoadingPage());
                        });
                },
            }),
            menu,
        });
    }, getAppContainer);

export const profileEditSecondNameRoute = create(
    '/profile/edit/second_name',
    async (): Promise<ProfileEditPage> => {
        const user = getUser();
        const menu = getProfileInnerMenu();

        return new ProfileEditPage({
            header: new HeaderInnerComponent({
                title: 'Edit Second Name',
                avatar: user?.avatar,
                theme: Theme.LIGHT,
                menu,
                onBackButtonClick: () => {
                    navigate('/profile');
                },
            }),
            form: new UserInfoFormComponent({
                field: new UserFieldComponent({
                    name: PROFILE_EDIT_FIELDS_ENUM.SECOND_NAME,
                    info: 'The Second Name should contain of Latin or Russian ' +
                        'letters without spaces, digits and should ' +
                        'start with capital letter.',
                    placeholder: 'Your Second Name',
                    value: String(getUserFieldValue(PROFILE_EDIT_FIELDS_ENUM.SECOND_NAME) || ''),
                }, [
                    validateName,
                ]),
                onSubmit: async (value: string) => {
                    show(await globalLoadingPage());

                    saveUserField(PROFILE_EDIT_FIELDS_ENUM.SECOND_NAME, value)
                        .then(async () => {
                            navigate('/profile');
                        })
                        .catch((reason) => {
                            showAlertError(reason);
                        })
                        .finally(async () => {
                            hide(await globalLoadingPage());
                        });
                },
            }),
            menu,
        });
    }, getAppContainer);

export const profileEditEmailRoute = create(
    '/profile/edit/email',
    async (): Promise<ProfileEditPage> => {
        const user = getUser();
        const menu = getProfileInnerMenu();

        return new ProfileEditPage({
            header: new HeaderInnerComponent({
                title: 'Edit Email',
                avatar: user?.avatar,
                theme: Theme.LIGHT,
                menu,
                onBackButtonClick: () => {
                    navigate('/profile');
                },
            }),
            form: new UserInfoFormComponent({
                field: new UserFieldComponent({
                    name: PROFILE_EDIT_FIELDS_ENUM.EMAIL,
                    info: 'The Email should contain of Latin ' +
                        'letters without spaces, digits',
                    placeholder: 'Your Email',
                    value: String(getUserFieldValue(PROFILE_EDIT_FIELDS_ENUM.EMAIL) || ''),
                }, [
                    validateEmail,
                ]),
                onSubmit: async (value: string) => {
                    show(await globalLoadingPage());

                    saveUserField(PROFILE_EDIT_FIELDS_ENUM.EMAIL, value)
                        .then(async () => {
                            navigate('/profile');
                        })
                        .catch((reason) => {
                            showAlertError(reason);
                        })
                        .finally(async () => {
                            hide(await globalLoadingPage());
                        });
                },
            }),
            menu,
        });
    }, getAppContainer);

export const profileEditPhoneRoute = create(
    '/profile/edit/phone',
    async (): Promise<ProfileEditPage> => {
        const user = getUser();
        const menu = getProfileInnerMenu();

        return new ProfileEditPage({
            header: new HeaderInnerComponent({
                title: 'Edit Phone',
                avatar: user?.avatar,
                theme: Theme.LIGHT,
                menu,
                onBackButtonClick: () => {
                    navigate('/profile');
                },
            }),
            form: new UserInfoFormComponent({
                field: new UserFieldComponent({
                    name: PROFILE_EDIT_FIELDS_ENUM.PHONE,
                    info: 'The Phone Number should contain of digits and ' +
                        'special symbol(+) without spaces and letter',
                    placeholder: 'Your Phone',
                    value: String(getUserFieldValue(PROFILE_EDIT_FIELDS_ENUM.PHONE) || ''),
                }, [
                    validatePhone,
                ]),
                onSubmit: async (value: string) => {
                    show(await globalLoadingPage());

                    saveUserField(PROFILE_EDIT_FIELDS_ENUM.PHONE, value)
                        .then(async () => {
                            navigate('/profile');
                        })
                        .catch((reason) => {
                            showAlertError(reason);
                        })
                        .finally(async () => {
                            hide(await globalLoadingPage());
                        });
                },
            }),
            menu,
        });
    }, getAppContainer);

export const profileEditDisplayNameRoute = create(
    '/profile/edit/display_name',
    async (): Promise<ProfileEditPage> => {
        const user = getUser();
        const menu = getProfileInnerMenu();

        return new ProfileEditPage({
            header: new HeaderInnerComponent({
                title: 'Edit Display Name',
                avatar: user?.avatar,
                theme: Theme.LIGHT,
                menu,
                onBackButtonClick: () => {
                    navigate('/profile');
                },
            }),
            form: new UserInfoFormComponent({
                field: new UserFieldComponent({
                    name: PROFILE_EDIT_FIELDS_ENUM.DISPLAY_NAME,
                    info: 'The Display Name should contain of letter and ' +
                        'without spaces, special symbols and numbers',
                    placeholder: 'Your Display Name',
                    value: String(getUserFieldValue(PROFILE_EDIT_FIELDS_ENUM.DISPLAY_NAME) || ''),
                }, [
                    validateLogin,
                ]),
                onSubmit: async (value: string) => {
                    show(await globalLoadingPage());

                    saveUserField(PROFILE_EDIT_FIELDS_ENUM.DISPLAY_NAME, value)
                        .then(async () => {
                            navigate('/profile');
                        })
                        .catch((reason) => {
                            showAlertError(reason);
                        })
                        .finally(async () => {
                            hide(await globalLoadingPage());
                        });
                },
            }),
            menu,
        });
    }, getAppContainer);
