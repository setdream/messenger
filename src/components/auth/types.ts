import { FieldComponent } from '@components/field';

export type AuthProps = {
    title: string,
}

export type SignInFormData = {
    email: string,
    password: string
}

export type SignUpFormData = {
    email: string,
    password: string,
    first_name: string,
    second_name: string,
    phone: string
}

export type SignInProps = {
    email: FieldComponent,
    password: FieldComponent,
    onFormSubmit: (data: SignInFormData) => void
} & AuthProps;

export type SignUpProps = {
    email: FieldComponent,
    password: FieldComponent,
    first_name: FieldComponent,
    second_name: FieldComponent,
    phone: FieldComponent,
    onFormSubmit: (data: SignUpFormData) => void
} & AuthProps;

