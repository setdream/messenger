export enum FieldTypes {
    EMAIL = 'email',
    PASSWORD = 'password',
    TEXT = 'text',
}

export type FieldProps = {
    name: string,
    type: FieldTypes,
    value?: string,
    placeholder?: string
}
