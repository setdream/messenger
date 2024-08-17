import './search.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { SearchPageProps } from './types';

import template from './search.hbs';

export class SearchPage extends Component<SearchPageProps> {
    render(): HTMLElement {
        return toDomTree(template<SearchPageProps>(this.props));
    }
}
