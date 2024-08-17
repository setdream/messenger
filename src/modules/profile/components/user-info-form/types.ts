import { UserFieldComponent } from '../user-field';

export type UserInfoFormProps = {
    field: UserFieldComponent,
    onSubmit?: (value: string) => void
}
