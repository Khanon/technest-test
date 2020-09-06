import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { SocketEvents } from '../models/socket.model';
import { AccountInterface } from '../models/account.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    constructor(private core: CoreService) {
        this.checkConnected();
    }

    isConnected() {
        if (this.core.socket) {
            return this.core.socket.isConnected();
        } else {
            return false;
        }
    }

    checkConnected() {
        setTimeout(() => {
            if (this.isConnected()) {
                // Ask for initial data
                this.getExchangeRate();
                this.getAccounts();
            } else {
                this.checkConnected();
            }
        }, 3000);
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
    onAccounts(): Observable<AccountInterface[]> {
        return this.core.socket.fromEvent<AccountInterface[]>(SocketEvents.ON_ACCOUNTS);
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
