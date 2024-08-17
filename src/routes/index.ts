import { error404Route } from '@routes/common/error.routes';
import { signInRoute, signUpRoute } from '@routes/auth/auth.routes';
import { chatsRoute } from '@routes/chats/chats.routes';
import { searchUsersRoute } from '@routes/chats/search-users.routes';
import { conversationRoute } from '@routes/chats/conversation.routes';
import { profilePasswordEditRoute } from '@routes/profile/password.routes';
import {
    profileEditDisplayNameRoute,
    profileEditEmailRoute,
    profileEditFirstNameRoute,
    profileEditPhoneRoute,
    profileEditSecondNameRoute,
} from '@routes/profile/profile-edit.routes';
import { profileRoute } from '@routes/profile/profile.routes';

export const userRoutes = [
    chatsRoute,
    profileRoute,
    profileEditFirstNameRoute,
    profileEditSecondNameRoute,
    profileEditEmailRoute,
    profileEditPhoneRoute,
    profilePasswordEditRoute,
    profileEditDisplayNameRoute,
    searchUsersRoute,
    conversationRoute,
    error404Route,
];

export const guestRoutes = [
    signInRoute,
    signUpRoute,
    error404Route,
];
