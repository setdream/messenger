export type UserInfoFieldHandlerCallback = (...args: unknown[]) => unknown;

export type UserInfoFieldProps = {
    value: string,
    editTitle: string,
    editUrl?: string,
    onTap?: UserInfoFieldHandlerCallback,
    hasEmphasis?: boolean;
}
