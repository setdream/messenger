import { SearchComponent } from '@modules/search';
import { HeaderInnerComponent } from '@components/header';
import { MenuComponent } from '@components/menu';
import { SearchFieldComponent } from '@modules/search/components/search-field';

export type SearchPageProps = {
    searchField: SearchFieldComponent,
    list: SearchComponent,
    header: HeaderInnerComponent,
    menu: MenuComponent
};
