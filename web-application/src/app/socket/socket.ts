import { Socket } from 'ngx-socket-io';
import { SocketBase, SocketEvents } from '../models/socket.model';

export class SocketNgx extends SocketBase {
    constructor(url: string, port: string) {
        const targetUrl = `${url}:${port}`;
        super({ url: targetUrl, options: {} });
        console.log(`Socket: Ngx socket, Connecting to ${targetUrl}.`);

        // Events
        this.fromEvent<void>(SocketEvents.ON_CONNECTED).subscribe(msg => {
            this.onConnected();
        });
    }

    isConnected(): boolean {
        return this.pConnected;
    }

    onConnected() {
        // Handlke on connection
        this.pConnected = true;
    }

    onDisconnected() {
        // Handlke on disconnection
        this.pConnected = false;
    }
}
