import './loading.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { LoadingProps, LoadingParametersProps } from './types';

import logo from './images/logo.svg';
import template from './loading.hbs';

export class LoadingComponent extends Component<LoadingProps> {
    render(): HTMLElement {
        return toDomTree(template<LoadingParametersProps>({ ...this.props, logo }));
    }
}
