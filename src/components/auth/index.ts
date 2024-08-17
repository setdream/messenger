import './auth.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { SignInProps, SignUpProps, AuthProps } from './types';

import templateSignIn from './auth-signin.hbs';
import templateSignUp from './auth-signup.hbs';

abstract class AuthComponent<T extends AuthProps> extends Component<T> {
    componentDidRender(): void {
        this.getContent()
            ?.addEventListener('submit', this.onFormSubmit.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.removeEventListener('submit', this.onFormSubmit.bind(this));
    }

    abstract onFormSubmit(e: Event): void;
}

export class SignInComponent extends AuthComponent<SignInProps> {
    onFormSubmit(e: Event): void {
        e.preventDefault();

        const {
            email,
            password,
        } = this.props;

        if (email.validate() && password.validate()) {
            const data = new FormData(this.getContent() as HTMLFormElement);

            console.log(data.get('email'));
            console.log(data.get('password'));

            this.props.onFormSubmit({
                password: String(data.get('password')),
                email: String(data.get('email')),
            });
        }
    }

    render(): HTMLElement {
        return toDomTree(templateSignIn<SignInProps>(this.props));
    }
}

export class SignUpComponent extends AuthComponent<SignUpProps> {
    onFormSubmit(e: Event): void {
        e.preventDefault();

        const {
            email,
            password,
            first_name,
            second_name,
            phone,
        } = this.props;

        if (first_name.validate() &&
            second_name.validate() &&
            email.validate() &&
            password.validate() &&
            phone.validate()) {
            const data = new FormData(this.getContent() as HTMLFormElement);

            this.props.onFormSubmit({
                first_name: String(data.get('first_name')),
                second_name: String(data.get('second_name')),
                password: String(data.get('password')),
                email: String(data.get('email')),
                phone: String(data.get('phone')),
            });
        }
    }

    render(): HTMLElement {
        return toDomTree(templateSignUp<SignUpProps>(this.props));
    }
}
