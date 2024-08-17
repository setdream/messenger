import './chats.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { ChatsPageProps } from './types';

import template from './chats.hbs';

export class ChatsPage extends Component<ChatsPageProps> {
    render(): HTMLElement {
        return toDomTree(template<ChatsPageProps>(this.props));
    }
}
