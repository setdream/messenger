import './header.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view';
import { show } from '@lib/view/utils';
import { HeaderModalProps, HeaderCommonProps, HeaderInnerProps, BaseHeaderProps } from './types';

import headerModalTemplate from './header-modal.hbs';
import headerInnerTemplate from './header-inner.hbs';
import headerCommonTemplate from './header-common.hbs';
import authStore, { connectToStore } from '@stores/auth/auth.store';

abstract class BaseHeaderComponent<T extends BaseHeaderProps> extends Component<T> {
    onAvatarClick() {
        const menu = this.props.menu;

        if (menu) {
            show(menu);
        }
    }

    componentDidRender(): void {
        this.getContent()
            ?.querySelector('[data-role-avatar]')
            ?.addEventListener('click', this.onAvatarClick.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.querySelector('[data-role-avatar]')
            ?.removeEventListener('click', this.onAvatarClick.bind(this));
    }
}

export class HeaderCommonComponent extends BaseHeaderComponent<HeaderCommonProps> {
    onSearchButtonClick(e: Event): void {
        e.preventDefault();

        this.props.onSearchButtonClick?.call(null);
    }

    componentDidRender(): void {
        super.componentDidRender();

        this.getContent()
            ?.querySelector('[data-role-search-button]')
            ?.addEventListener('click', this.onSearchButtonClick.bind(this));
    }

    componentWillRender(): void {
        super.componentWillRender();

        this.getContent()
            ?.querySelector('[data-role-search-button]')
            ?.removeEventListener('click', this.onSearchButtonClick.bind(this));
    }

    render(): HTMLElement {
        return toDomTree(headerCommonTemplate<HeaderCommonProps>(this.props));
    }
}

export class HeaderInnerComponent extends BaseHeaderComponent<HeaderInnerProps> {
    constructor(props: HeaderInnerProps) {
        super(props);

        connectToStore(this, authStore);
    }

    onBackButtonClick(e: Event): void {
        e.preventDefault();

        this.props.onBackButtonClick?.call(null);
    }

    componentDidRender(): void {
        super.componentDidRender();

        this.getContent()
            ?.querySelector('.back-button')
            ?.addEventListener('click', this.onBackButtonClick.bind(this));
    }

    componentWillRender(): void {
        super.componentWillRender();

        this.getContent()
            ?.querySelector('.back-button')
            ?.removeEventListener('click', this.onBackButtonClick.bind(this));
    }

    render(): HTMLElement {
        return toDomTree(headerInnerTemplate<HeaderInnerProps>(this.props));
    }
}

export class HeaderModalComponent extends BaseHeaderComponent<HeaderModalProps> {
    onCloseButtonClick(e: Event): void {
        e.preventDefault();

        this.props.onCloseButtonClick?.call(null);
    }

    componentDidRender(): void {
        super.componentDidRender();

        this.getContent()
            ?.querySelector('.close-button')
            ?.addEventListener('click', this.onCloseButtonClick.bind(this));
    }

    componentWillRender(): void {
        super.componentWillRender();

        this.getContent()
            ?.querySelector('.close-button')
            ?.removeEventListener('click', this.onCloseButtonClick.bind(this));
    }

    render(): HTMLElement {
        return toDomTree(headerModalTemplate<HeaderModalProps>(this.props));
    }
}

export { Theme } from './types';
