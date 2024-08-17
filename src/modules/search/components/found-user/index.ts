import './found-user.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view';
import { FoundUserProps, FoundUserParamsProps } from './types';

import template from './found-user.hbs';

export class FoundUserComponent extends Component<FoundUserProps> {
    onLoadImageError(): void {
        this.setProps({
            avatar: undefined,
        });
    }

    componentDidRender(): void {
        this.getContent()
            ?.querySelector('[data-role-found-user-avatar]')
            ?.addEventListener('error', this.onLoadImageError.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.querySelector('[data-role-found-user-avatar]')
            ?.removeEventListener('error', this.onLoadImageError.bind(this));
    }

    getInitials(first_name: string, second_name: string): string {
        return `${first_name.charAt(0).toUpperCase()}.${second_name.charAt(0).toUpperCase()}.`;
    }

    render(): HTMLElement {
        return toDomTree(template<FoundUserParamsProps>({
            ...this.props,
            initials: this.getInitials(this.props.first_name, this.props.second_name),
        }));
    }
}
