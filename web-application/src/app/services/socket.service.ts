import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { SocketEvents } from '../models/socket.model';
import { Account } from '../models/account.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    constructor(private core: CoreService) { }

    isConnected() {
        return this.core.socket.isConnected();
    }

    /**
     * Ask to retrieve accounts data, the data wil be received on ''
     */
    getAccounts() {
        this.core.socket.emit(SocketEvents.GET_ACCOUNTS);
    }

    /**
     * Receice accounts data
     */
    onAccounts(): Observable<Account[]> {
        return this.core.socket.fromEvent<Account[]>(SocketEvents.ON_ACCOUNTS);
    }

    /**
     * Ask to retrieve accounts data, the data wil be received on ''
     */
    getExchangeRate() {
        this.core.socket.emit(SocketEvents.GET_EXCHANGE_RATE);
    }

    /**
     * Reveice new exchange rate
     */
    onExchangeRate(): Observable<number> {
        return this.core.socket.fromEvent<number>(SocketEvents.ON_EXCHANGE_RATE);
    }
}
