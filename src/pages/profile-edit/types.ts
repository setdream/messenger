import { HeaderInnerComponent } from '@components/header';
import { UserInfoFormComponent } from '@modules/profile';
import { User } from '@api/user/types';
import { MenuComponent } from '@components/menu';
import { ValidatorFunction } from '@lib/validator/types';

export type ProfileEditPageProps = {
    header: HeaderInnerComponent,
    form: UserInfoFormComponent,
    menu: MenuComponent
}

export type ProfileEditPageParameters = {
    title: string,
    field: keyof User,
    info: string,
    placeholder: string,
    validators: ValidatorFunction[]
    onSubmit?: (value: string) => void
}

export enum PROFILE_EDIT_FIELDS_ENUM {
    FIRST_NAME = 'first_name',
    SECOND_NAME = 'second_name',
    EMAIL = 'email',
    PHONE = 'phone',
    DISPLAY_NAME = 'display_name',
}
