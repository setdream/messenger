import './search-field.css';

import { Component } from '@lib/view/index';
import { toDomTree } from '@lib/handlebars';

import { SearchFieldProps } from './types';

import template from './search-field.hbs';

export class SearchFieldComponent extends Component<SearchFieldProps> {
    onKeyUp(e: Event): void {
        const target = e.currentTarget as HTMLInputElement;

        if (target) {
            this.props.onKeyUp(target.value);
        }
    }

    componentDidRender(): void {
        this.getContent()
            ?.querySelector('[data-role-search-input]')
            ?.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.querySelector('[data-role-search-input]')
            ?.removeEventListener('keyup', this.onKeyUp.bind(this));
    }

    render(): HTMLElement {
        return toDomTree(template<SearchFieldProps>(this.props));
    }
}
