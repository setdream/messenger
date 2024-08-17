export type User = {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string
};

export type UserProfileParameters = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export type UserChangePasswordParameters = {
    oldPassword: string,
    newPassword: string,
}

export type UserSearchParameters = {
    login: string,
}

export type GetUserParameters = {
    id: number,
}
