export enum Sender {
    ME = 'me',
    BUDDY = 'buddy'
}

export type MessageProps = {
    sender: Sender,
    text: string,
    time: string
}
