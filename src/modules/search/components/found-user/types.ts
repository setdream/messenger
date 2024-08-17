import { User } from '@api/user/types';

export type FoundUserProps = User

export type FoundUserParamsProps = {
    initials: string
} | User;
