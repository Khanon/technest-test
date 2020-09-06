import { Socket } from 'ngx-socket-io';

export enum SocketEvents {
    ON_CONNECTED = 'on_connected',
    GET_ACCOUNTS = 'get_accounts',
    ON_ACCOUNTS = 'on_accounts',
    GET_EXCHANGE_RATE = 'get_exchange_rate',
    ON_EXCHANGE_RATE = 'on_exchange_rate'
}

export abstract class SocketBase extends Socket {
    protected pConnected: boolean;
    abstract isConnected(): boolean;
}
