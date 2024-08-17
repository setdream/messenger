import './search.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { SearchProps } from './types';

import template from './search.hbs';

export { SearchFieldComponent } from './components/search-field';
export { FoundUserComponent } from './components/found-user';

export class SearchComponent extends Component<SearchProps> {
    onFoundItemCLick(e: Event): void {
        const target = e.target;

        if (target instanceof HTMLElement) {
            const userId = target
                ?.closest('article')
                ?.getAttribute('data-user-id');

            if (userId) {
                this.props.onFoundItemCLick(userId);
            }
        }
    }

    componentDidRender(): void {
        this.getContent()
            ?.querySelector('[data-role-users-list]')
            ?.addEventListener('click', this.onFoundItemCLick.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.querySelector('[data-role-users-list]')
            ?.removeEventListener('click', this.onFoundItemCLick.bind(this));
    }

    render(): HTMLElement {
        return toDomTree(template<SearchProps>(this.props));
    }
}
