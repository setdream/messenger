export type ChatProps = {
    chatId: number,
    avatar?: string,
    name: string,
    short: string,
    time: string,
    unreadMessages?: number
}

export type ChatWithShortNameProps = {
    shortName: string
} | ChatProps;
