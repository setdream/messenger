export type ChatIncomingData = {
    id: string,
    time: string,
    user_id: string,
    content: string,
    type: string,
}

export type ConnectorMessageListener = (data: ChatIncomingData) => void
export type ConnectorMessageListListener = (data: ChatIncomingData[]) => void
