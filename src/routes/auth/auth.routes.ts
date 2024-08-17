import { create, navigate } from '@lib/router';

import { SignInPage } from '@pages/signin';
import { SignUpPage } from '@pages/signup';

import { LogoComponent } from '@components/logo';
import { showAlertError } from '@components/alert';
import { FieldComponent } from '@components/field';
import { FieldTypes } from '@components/field/types';
import { SignInComponent, SignUpComponent } from '@components/auth';
import {
    validateEmail,
    validatePassword,
    validateName,
    validatePhone,
} from '@models/user/validators';

import { signIn, signUp } from '@services/auth.service';
import { show, hide } from '@lib/view/utils';

import { globalLoadingPage } from '@pages/loading';
import { getAppContainer } from '@routes/utils';

export const signInRoute = create(['/', '/signin'], async () => {
    return new SignInPage({
        logo: new LogoComponent({
            name: 'Meetium',
        }),
        signin: new SignInComponent({
            title: 'Sign In',
            email: new FieldComponent({
                name: 'email',
                type: FieldTypes.EMAIL,
                placeholder: 'Email',
            }, [
                validateEmail,
            ]),
            password: new FieldComponent({
                name: 'password',
                type: FieldTypes.PASSWORD,
                placeholder: 'Password',
            }, [
                validatePassword,
            ]),
            onFormSubmit: async (data) => {
                show(await globalLoadingPage());

                signIn(data.email, data.password)
                    .then(() => navigate('/'))
                    .catch((reason) => showAlertError(reason))
                    .finally(() => setTimeout(async () => hide(await globalLoadingPage()), 1000));
            },
        }),
    });
}, getAppContainer);

export const signUpRoute = create(['/', '/signup'], async () => {
    return new SignUpPage({
        logo: new LogoComponent({
            name: 'Meetium',
        }),
        signup: new SignUpComponent({
            title: 'Sign Up',
            email: new FieldComponent({
                name: 'email',
                type: FieldTypes.EMAIL,
                placeholder: 'Email',
            }, [
                validateEmail,
            ]),
            password: new FieldComponent({
                name: 'password',
                type: FieldTypes.PASSWORD,
                placeholder: 'Password',
            }, [
                validatePassword,
            ]),
            first_name: new FieldComponent({
                name: 'first_name',
                type: FieldTypes.TEXT,
                placeholder: 'First Name',
            }, [
                validateName,
            ]),
            second_name: new FieldComponent({
                name: 'second_name',
                type: FieldTypes.TEXT,
                placeholder: 'Second Name',
            }, [
                validateName,
            ]),
            phone: new FieldComponent({
                name: 'phone',
                type: FieldTypes.TEXT,
                placeholder: 'Phone',
            }, [
                validatePhone,
            ]),
            onFormSubmit: async (data) => {
                show(await globalLoadingPage());

                signUp(data)
                    .then(() => setTimeout(async () => {
                        navigate('/');
                    }, 500))
                    .catch((reason) => showAlertError(reason))
                    .finally(() => setTimeout(async () => hide(await globalLoadingPage()), 1000));
            },
        }),
    });
}, getAppContainer);
