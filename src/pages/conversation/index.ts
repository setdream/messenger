import './conversation.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { ConversationPageProps } from './types';

import template from './conversation.hbs';

import { EVENT_COMPONENT_DESTROYED } from '@lib/view/constants/events';

export class ConverstionPage extends Component<ConversationPageProps> {
    constructor(props: ConversationPageProps) {
        super(props);

        this.getEventBus().on(EVENT_COMPONENT_DESTROYED, this.onDestroyed.bind(this));
    }

    onDestroyed(): void {
        this.props.onDestroyed();
    }

    render(): HTMLElement {
        return toDomTree(template<ConversationPageProps>(this.props));
    }
}

