import './logo.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { LogoProps, LogoPropsWithImage } from './types';

import logo from './images/logo.svg';
import template from './logo.hbs';

export class LogoComponent extends Component<LogoProps> {
    render(): HTMLElement {
        return toDomTree(template<LogoPropsWithImage>({ ...this.props, logo }));
    }
}
