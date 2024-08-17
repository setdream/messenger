import './error.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { ErrorProps, ErrorPropsWithLogo } from './types';

import errorLogo from './assets/images/logo-error.svg';

import template from './error.hbs';

export class ErrorComponent extends Component<ErrorProps> {
    render(): HTMLElement {
        return toDomTree(template<ErrorPropsWithLogo>({
            ...this.props,
            logo: errorLogo,
        }));
    }
}
