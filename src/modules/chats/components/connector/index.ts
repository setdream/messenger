import { EventBus } from '@lib/observer';
import { ConnectorMessageListener, ConnectorMessageListListener } from './types';

export const EVENT_MESSAGE = 'event:message';

const PING_TIMEOUT = 30000;

export class ChatConnector extends EventBus {
    private socket: Promise<WebSocket> | null = null;
    private pingTimeoutId: number | null = null;

    constructor(private chatId: number, private userId: number, private token: string) {
        super();

        this.init();
    }

    private getSocket(): Promise<WebSocket> {
        if (this.socket) {
            return Promise.resolve(this.socket);
        }

        return this.init();
    }

    private connect(): Promise<WebSocket> {
        return new Promise((resolve, reject) => {
            const socket = new WebSocket(
                `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`
            );

            socket.addEventListener('error', (reason) => reject(reason));
            socket.addEventListener('open', () => resolve(socket));
        });
    }

    private async init(): Promise<WebSocket> {
        const socket = await (this.socket = this.connect());

        socket.addEventListener('close', () => {
            this.socket = null;

            if (this.pingTimeoutId) {
                window.clearTimeout(this.pingTimeoutId);
            }
        });

        socket.addEventListener('message', (event) => {
            this.emit(EVENT_MESSAGE, event.data);
        });

        this.startPingMessageTimer();

        return socket;
    }

    addMessageListener(callback: ConnectorMessageListener): void {
        this.on(EVENT_MESSAGE, (data: string) => {
            const parsedData = JSON.parse(data);

            if (parsedData && parsedData.type === 'message') {
                callback(parsedData);
            }
        });
    }

    addOldMessagesListener(callback: ConnectorMessageListListener): void {
        this.on(EVENT_MESSAGE, (data: string) => {
            const parsedData = JSON.parse(data);

            if (Array.isArray(parsedData)) {
                callback(parsedData);
            }
        });
    }

    getOldMessages(offset = 0): void {
        this.getSocket().then((socket) => {
            socket.send(JSON.stringify({
                content: offset,
                type: 'get old',
            }));
        });
    }

    startPingMessageTimer(): void {
        this.pingTimeoutId = window.setTimeout(() => {
            this.getSocket().then((socket) => {
                socket.send(JSON.stringify({
                    type: 'ping',
                }));
            });

            this.startPingMessageTimer();
        }, PING_TIMEOUT);
    }

    sendMessage(message: string): void {
        this.getSocket().then((socket) => {
            socket.send(JSON.stringify({
                content: message,
                type: 'message',
            }));
        });
    }

    close(): void {
        if (this.socket) {
            this.socket.then((socket) => socket.close());
        }
    }
}
