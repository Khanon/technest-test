import { Socket } from 'ngx-socket-io';

export enum SocketEvents {
    GET_ACCOUNTS = 'get_accounts',
    ON_ACCOUNTS = 'on_accounts',
    GET_EXCHANGE_RATE = 'get_exchange_rate',
    ON_EXCHANGE_RATE = 'on_exchange_rate',
    ON_TRANSACTIONS = 'on_transactions'
}

export abstract class SocketBase extends Socket {
    abstract isConnected(): boolean;
}
