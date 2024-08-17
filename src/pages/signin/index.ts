import './signin.css';

import { toDomTree } from '@lib/handlebars';

import { Component } from '@lib/view/index';
import { SignInPageProps } from './types';

import template from './signin.hbs';

export class SignInPage extends Component<SignInPageProps> {
    render(): HTMLElement {
        return toDomTree(template<SignInPageProps>(this.props));
    }
}
