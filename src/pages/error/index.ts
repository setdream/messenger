import './error.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { ErrorPageProps } from './types';

import template from './error.hbs';

export class ErrorPage extends Component<ErrorPageProps> {
    render(): HTMLElement {
        return toDomTree(template<ErrorPageProps>(this.props));
    }
}
