import './loading.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view';
import { LogoComponent } from '@components/logo';
import { LoadingPageProps } from './types';

import { render, hide } from '@lib/view/utils';

import template from './loading.hbs';

export class LoadingPage extends Component<LoadingPageProps> {
    render(): HTMLElement {
        return toDomTree(template<LoadingPageProps>(this.props));
    }
}

export const globalLoadingPage = ((loadingPageCompoment: LoadingPage | null = null) => {
    return () => {
        if (!loadingPageCompoment) {
            loadingPageCompoment = new LoadingPage({
                logo: new LogoComponent({
                    name: 'Loading...',
                }),
            });

            hide(loadingPageCompoment);
        }

        return loadingPageCompoment;
    };
})();

export async function initGlobalLoadingPage(container: HTMLElement): Promise<void> {
    render(globalLoadingPage(), container);
}
