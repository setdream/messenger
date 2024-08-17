import './user-info.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { UserInfoProps } from './types';

import template from './user-info.hbs';

export class UserInfoComponent extends Component<UserInfoProps> {
    onAvatarClick(e: Event): void {
        e.preventDefault();

        this.getContent()
            ?.querySelector<HTMLInputElement>('[data-role-avatar-upload-field]')
            ?.click();
    }

    onChangeAvatar(e: Event): void {
        e.preventDefault();

        const imgElement = e.target as HTMLInputElement;

        const [file] = imgElement.files || [];

        if (file) {
            const formData = new FormData();
            formData.append('avatar', file, file.name);

            this.props.onImageChanged?.call(null, formData, file, this);
        }
    }

    componentDidRender(): void {
        this.getContent()
            ?.querySelector('.user-info__avatar')
            ?.addEventListener('click', this.onAvatarClick.bind(this));

        this.getContent()
            ?.querySelector<HTMLInputElement>('[data-role-avatar-upload-field]')
            ?.addEventListener('change', this.onChangeAvatar.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.querySelector('.user-info__avatar')
            ?.removeEventListener('click', this.onAvatarClick.bind(this));

        this.getContent()
            ?.querySelector<HTMLInputElement>('[data-role-avatar-upload-field]')
            ?.addEventListener('change', this.onChangeAvatar.bind(this));
    }

    render(): HTMLElement {
        return toDomTree(template<UserInfoProps>(this.props));
    }
}
