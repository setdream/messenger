import { create, navigate } from '@lib/router';

import { PasswordPage } from '@pages/password';
import { HeaderInnerComponent, Theme } from '@components/header';
import { validatePassword, makeEqualValidator } from '@models/user/validators';

import { showAlertError } from '@components/alert';
import { globalLoadingPage } from '@pages/loading';

import {
    CombineFormComponent,
    UserFieldComponent,
    UserInfoFormComponent,
} from '@modules/profile';

import { changeUserPassword } from '@services/user.service';
import { getUser } from '@stores/auth/auth.store';

import { show, hide } from '@lib/view/utils';
import { getProfileInnerMenu } from './utils';
import { getAppContainer } from '@routes/utils';

export const profilePasswordEditRoute = create(
    '/profile/edit/password',
    async (): Promise<PasswordPage> => {
        const user = getUser();
        const menu = getProfileInnerMenu();

        const oldPasswordField = new UserFieldComponent({
            name: 'password',
            info: 'Please enter old password. The field length should be from 8 to 40' +
                ', have at least one capital letter and at least one digit',
            placeholder: 'Old Password',
            value: '',
        }, [validatePassword]);

        const newPasswordField = new UserFieldComponent({
            name: 'password',
            info: 'Please enter new password. The field length should be from 8 to 40' +
                ', have at least one capital letter and at least one digit',
            placeholder: 'New password',
            value: '',
        }, [validatePassword]);

        const isEqualValidator = makeEqualValidator(() => newPasswordField.getValue());

        const combineForm = new CombineFormComponent({
            forms: [
                new UserInfoFormComponent({
                    field: oldPasswordField,
                    onSubmit: () => {
                        combineForm.next();
                    },
                }),
                new UserInfoFormComponent({
                    field: newPasswordField,
                    onSubmit: () => {
                        combineForm.next();
                    },
                }),
                new UserInfoFormComponent({
                    field: new UserFieldComponent({
                        name: 'password',
                        info: 'Please enter new password again. The field length' +
                            ' should be from 8 to 40 , have at least one capital' +
                            ' letter and at least one digit. Of course the field' +
                            ' should be equal to previous new password field',
                        placeholder: 'Again, new password',
                        value: '',
                    }, [validatePassword, isEqualValidator]),
                    onSubmit: async (value) => {
                        show(await globalLoadingPage());

                        changeUserPassword(oldPasswordField.getValue(), value)
                            .then(async () => {
                                navigate('/profile');
                            })
                            .catch((reason) => {
                                if (reason instanceof Error) {
                                    showAlertError(reason.message);
                                }

                                combineForm.reset();
                            })
                            .finally(async () => {
                                hide(await globalLoadingPage());
                            });
                    },
                }),
            ],
        });

        return new PasswordPage({
            header: new HeaderInnerComponent({
                title: 'Change Password',
                avatar: user?.avatar,
                theme: Theme.LIGHT,
                menu,
                onBackButtonClick: () => {
                    navigate('/profile');
                },
            }),
            combineForm,
            menu,
        });
    }, getAppContainer);
