import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { SocketEvents } from '../models/socket.model';
import { CoreData } from './core.data';

@WebSocketGateway()
export class CoreGateway implements OnGatewayConnection, OnGatewayDisconnect {
    coreData: CoreData;
    constructor() {
        this.coreData = new CoreData();
    }

    @WebSocketServer() server;

    async handleConnection(client) {
        // Handle new connection
        client.emit(SocketEvents.ON_CONNECTED);
    }

    async handleDisconnect(){
        // Handle disconnection
    }

    @SubscribeMessage(SocketEvents.GET_ACCOUNTS)
    async getAccounts(client){
        client.emit(SocketEvents.ON_ACCOUNTS, this.coreData.accounts);

        // Send random accounts
        this.sendRandomAccounts(client);
    }

    @SubscribeMessage(SocketEvents.GET_EXCHANGE_RATE)
    async getExchangeRate(client){
        client.emit(SocketEvents.ON_EXCHANGE_RATE, this.coreData.exchangeRate);

        // Send random exchange rate
        this.sendRandomExchangeRate(10000, client);
    }

    /**
     * Change balance on accounts and send it back every 10 / 15 secs
     * It could be optimized to send only the changed data
     */
    sendRandomAccounts(client) {
        setTimeout(() => {
            for (const account of this.coreData.accounts) {
                if (Math.random() < 0.5) {
                    account.balance *= Math.random() + 0.5;
                    account.availableBalance = account.balance / 2;
                }
            }
            client.emit(SocketEvents.ON_ACCOUNTS, this.coreData.accounts);
            this.sendRandomAccounts(client);
        }, (Math.random() * 10 + 5) * 1000);
    }

    sendRandomExchangeRate(interval: number, client) {
        setInterval(() => {
            this.coreData.exchangeRate = Math.random() * 3;
            client.emit(SocketEvents.ON_EXCHANGE_RATE, this.coreData.exchangeRate);
        }, interval);
    }
}