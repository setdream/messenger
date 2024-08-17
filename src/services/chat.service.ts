import * as ChatApi from '@api/chat';
import { Chat, ChatsSearchParameters, GetTokenResponse, RemoveChatResponse } from '@api/chat/types';

export function getChats(data: ChatsSearchParameters): Promise<Chat[]> {
    return ChatApi.getChats(data);
}

export function getToken(chatId: number): Promise<string> {
    return ChatApi.getToken({
        id: chatId,
    }).then((data: GetTokenResponse) => {
        return data.token;
    });
}

export function removeConversation(chatId: number): Promise<RemoveChatResponse> {
    return ChatApi.removeChat({
        chatId,
    });
}

export function createConversation(name: string, userId: number): Promise<number> {
    return ChatApi
        .createChat({
            title: name,
        })
        .then(({ id }) => ChatApi.addUserToChat({
            users: [
                userId,
            ],
            chatId: id,
        }));
}
