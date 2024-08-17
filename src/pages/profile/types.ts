import { HeaderInnerComponent } from '@components/header';
import { UserInfoComponent } from '@modules/profile/components/user-info';
import { MenuComponent } from '@components/menu';

export type ProfilePageProps = {
    header: HeaderInnerComponent,
    userInfo: UserInfoComponent,
    menu: MenuComponent,
}
