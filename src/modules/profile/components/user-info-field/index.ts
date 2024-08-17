import './user-info-field.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view';
import { UserInfoFieldProps } from './types';

import template from './user-info-field.hbs';

export class UserInfoFieldComponent extends Component<UserInfoFieldProps> {
    onTap(e: Event): void {
        e.preventDefault();

        if (this.props.onTap) {
            this.props.onTap();
        }
    }

    componentDidRender(): void {
        this.getContent()
            ?.querySelector('.user-info-field__edit-link')
            ?.addEventListener('click', this.onTap.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.querySelector('.user-info-field__edit-link')
            ?.removeEventListener('click', this.onTap.bind(this));
    }

    render(): HTMLElement {
        return toDomTree(template<UserInfoFieldProps>(this.props));
    }
}
