import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Subscription, BehaviorSubject } from 'rxjs';
import { SocketService } from './socket.service';
import { TableDataView } from '../models/view.model';
import { CurrencyId } from '../models/currency.model';

@Injectable({
    providedIn: 'root'
})
export class AccountsService {
    /** Global currencies associated to accounts and exchange */
    globalBalanceCurrency: CurrencyId = CurrencyId.BITCOIN;
    globalExchangeCurrency: CurrencyId = CurrencyId.DOLLAR;
    /** Exchange rate */
    exchangeRate: number;
    /** Whole list of accounts (no server side filtering for this test) */
    accounts: Account[];
    /** Data to show on table & data view settings */
    dataView: TableDataView<Account[]>;
    /** Subscriptions */
    onExchangeRate$: Subscription;
    onAccounts$: Subscription;
    /** Observables */
    obsUpdateExchangeRate$: BehaviorSubject<number>;

    constructor(private socketService: SocketService) {
        this.exchangeRate = 0;
        this.obsUpdateExchangeRate$ = new BehaviorSubject<number>(this.exchangeRate);
        this.initDataView();
        this.hookSubscriptions();
    }

    initDataView() {
        this.dataView = {
            length: 0,
            pageSize: 10,
            pageIndex: 0,
            pageSizeOptions: [5, 10, 15],
            data: []
        };
    }

    hookSubscriptions() {
        // Wait the socket connected to hook subscriptions
        if (this.socketService.isConnected()) {
            // Exchange rate update
            this.onExchangeRate$ = this.socketService.onExchangeRate().subscribe(exchangeRate => {
                this.obsUpdateExchangeRate$.next(exchangeRate - this.exchangeRate);
                this.exchangeRate = exchangeRate;
            });

            // Accounts update
            this.onAccounts$ = this.socketService.onAccounts().subscribe(accounts => {
                this.accounts = accounts;
                this.updateDataView();
            });
        } else {
            setTimeout(this.hookSubscriptions, 3000);
        }
    }

    /**
     * Update data to show on table after data change or page config change
     */
    updateDataView() {
        this.dataView.length = this.accounts.length;
        const pageIndex = this.dataView.pageIndex * this.dataView.pageSize;
        this.dataView.data = this.accounts.filter((account, index) => index >= pageIndex && index < pageIndex + this.dataView.pageSize);
    }
}
