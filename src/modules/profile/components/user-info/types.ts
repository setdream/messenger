import { UserInfoFieldComponent } from '@modules/profile';
import { UserInfoComponent } from '@modules/profile';

export type UserInfoProps = {
    first_name: UserInfoFieldComponent,
    second_name: UserInfoFieldComponent,
    email: UserInfoFieldComponent,
    phone: UserInfoFieldComponent,
    display_name: UserInfoFieldComponent,
    image?: string,
    onImageChanged: (data: FormData, file: File, self: UserInfoComponent) => void
}
