import './profile.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { ProfilePageProps } from './types';

import template from './profile.hbs';

export class ProfilePage extends Component<ProfilePageProps> {
    render(): HTMLElement {
        return toDomTree(template<ProfilePageProps>(this.props));
    }
}
