import { ChatsComponent } from '@modules/chats';
import { HeaderCommonComponent } from '@components/header';
import { MenuComponent } from '@components/menu';

export type ChatsPageProps = {
    list: ChatsComponent,
    header: HeaderCommonComponent,
    menu: MenuComponent
};
