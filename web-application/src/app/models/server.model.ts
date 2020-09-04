export enum ServerStatus {
    DISCONNECTED = 'disconnected',
    CONNECTED = 'connected'
}

export abstract class Server {
    abstract Init(): void;
    abstract Connect(): void;
}
