import './profile-edit.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view';
import { ProfileEditPageProps } from './types';

import template from './profile-edit.hbs';

export class ProfileEditPage extends Component<ProfileEditPageProps> {
    render(): HTMLElement {
        return toDomTree(template<ProfileEditPageProps>(this.props));
    }
}
