import './modal.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view';

import { ModalProps } from './types';

import template from './modal.hbs';

export class ModalComponent extends Component<ModalProps> {
    render(): HTMLElement {
        return toDomTree(template<ModalProps>(this.props));
    }
}
