import './menu.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view';
import { hide } from '@lib/view/utils';

import { MenuProps } from './types';

import template from './menu.hbs';

export class MenuComponent extends Component<MenuProps> {
    onBackgroundClick(): void {
        hide(this);
    }

    componentDidRender(): void {
        this.getContent()
            ?.querySelector('.menu-background')
            ?.addEventListener('click', this.onBackgroundClick.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.querySelector('.menu-background')
            ?.removeEventListener('click', this.onBackgroundClick.bind(this));
    }

    render(): HTMLElement {
        return toDomTree(template<MenuProps>(this.props));
    }
}
