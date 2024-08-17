import { User } from '@api/user/types';

export type ChatsSearchParameters = {
    title?: string,
    offset?: number,
    limit?: number
}

export type ChatsTokenParameters = {
    id: number
}

export type CreateChatParameters = {
    title: string
}

export type RemoveChatParameters = {
    chatId: number
}

export type AddUsersToChatParameters = {
    users: number[],
    chatId: number,
}

export type RemoveChatResponse = {
    userId: number,
    result: {
        id: number,
        title: string,
        avatar: string
    }
}

export type ChatResponse = {
    id: number
}

export type GetTokenResponse = {
    token: string
}

export type Chat = {
    id: number,
    title: string,
    avatar?: string,
    created_by: number,
    unread_count: number,
    last_message?: Message
}

export type Message = {
    user: User,
    time: string,
    content: string
}
