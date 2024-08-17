export type SignUpParameters = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
    display_name: string
};

export type SignInParameters = {
    login: string,
    password: string,
};

export type SignUpSuccessResponse = {
    id: number
};

export type BadResponse = {
    reason: string
};
