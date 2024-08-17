import { ConverstionComponent } from '@modules/conversation';
import { HeaderInnerComponent } from '@components/header';
import { MessageFieldComponent } from '@modules/conversation/components/message-field';
import { MenuComponent } from '@components/menu';

export type ConversationPageProps = {
    header: HeaderInnerComponent,
    conversation: ConverstionComponent,
    messageField: MessageFieldComponent,
    menu: MenuComponent,
    onDestroyed: () => void
}

export type ConversationPageParameters = {
    id: string
}

export type ChatUsersPageParameters = {
    id: string
}
