import { get, post, put, del } from '@lib/network/http';
import {
    ChatsSearchParameters,
    AddUsersToChatParameters,
    CreateChatParameters,
    ChatsTokenParameters,
    RemoveChatParameters,
    Chat,
    ChatResponse,
    GetTokenResponse,
    RemoveChatResponse,
} from './types';

import {
    createApiPathGenerator,
    jsonConfig,
    getJsonResponse,
    allow200Status,
} from '@lib/network/utils';

const generatePath = createApiPathGenerator('/api/v2/chats');

export function getChats(data: ChatsSearchParameters): Promise<Chat[]> {
    return get(generatePath('/'), jsonConfig({
        data,
    }))
        .then(allow200Status)
        .then((xhr) => getJsonResponse<Chat[]>(xhr));
}

export function getToken(data: ChatsTokenParameters): Promise<GetTokenResponse> {
    return post(generatePath(`/token/${data.id}`), jsonConfig())
        .then(allow200Status)
        .then((xhr) => getJsonResponse<GetTokenResponse>(xhr));
}

export function createChat(data: CreateChatParameters): Promise<ChatResponse> {
    return post(generatePath('/'), jsonConfig({
        data,
    }))
        .then(allow200Status)
        .then((xhr) => getJsonResponse<ChatResponse>(xhr));
}

export function removeChat(data: RemoveChatParameters): Promise<RemoveChatResponse> {
    return del(generatePath('/'), jsonConfig({
        data,
    }))
        .then(allow200Status)
        .then((xhr) => getJsonResponse<RemoveChatResponse>(xhr));
}

export function addUserToChat(data: AddUsersToChatParameters): Promise<number> {
    return put(generatePath('/users'), jsonConfig({
        data,
    }))
        .then(allow200Status)
        .then((xhr) => getJsonResponse<void>(xhr))
        .then(() => data.chatId);
}
