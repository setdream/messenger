import './password.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view';
import { PasswordPageProps } from './types';

import template from './password.hbs';

export class PasswordPage extends Component<PasswordPageProps> {
    render(): HTMLElement {
        return toDomTree(template<PasswordPageProps>(this.props));
    }
}
