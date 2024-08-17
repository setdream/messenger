import './signup.css';

import { toDomTree } from '@lib/handlebars';

import { Component } from '@lib/view/index';
import { SignUpPageProps } from './types';

import template from './signup.hbs';

export class SignUpPage extends Component<SignUpPageProps> {
    render(): HTMLElement {
        return toDomTree(template<SignUpPageProps>(this.props));
    }
}
