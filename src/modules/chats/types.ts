import { ChatComponent } from './components/chat';

export type ChatsProps = {
    chats: ChatComponent[],
    onChatItemClick: (userId: string) => void
}
