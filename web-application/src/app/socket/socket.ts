import { Socket } from 'ngx-socket-io';
import { SocketBase } from '../models/socket.model';

export class SocketNgx extends SocketBase {
    constructor(url: string, port: string) {
        const targetUrl = `${url}:${port}`;
        super({ url: targetUrl, options: {} });
        console.log(`Socket: Ngx socket, Connecting to ${targetUrl}.`);
    }

    isConnected(): boolean {
        return false;
    }
}
