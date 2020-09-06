import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Subscription, BehaviorSubject } from 'rxjs';
import { SocketService } from './socket.service';
import { TableDataView } from '../models/view.model';
import { CurrencyId } from '../models/currency.model';
import { Transaction } from '../models/transaction.model';

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
        this.obsUpdateExchangeRate$ = new BehaviorSubject<number>(this.exchangeRate);
        this.initDataView();
        this.hookSubscriptions();
    }

    initDataView() {
        this.dataView = {
            length: 0,
            pageSize: 10,
            pageIndex: 0,
            pageSizeOptions: [5, 10],
            data: []
        };
    }

    hookSubscriptions() {
        // Wait the socket connected to hook subscriptions
        if (this.socketService && this.socketService.isConnected()) {
            // Exchange rate update
            this.onExchangeRate$ = this.socketService.onExchangeRate().subscribe(exchangeRate => {
                this.obsUpdateExchangeRate$.next(exchangeRate - this.exchangeRate);
                this.exchangeRate = exchangeRate;
            });

            // Accounts update
            this.onAccounts$ = this.socketService.onAccounts().subscribe(accounts => {
                this.accounts = [];

                // Parse data
                for (const accountData of accounts) {
                    const account = new Account();
                    const transactions: Transaction[] = [];
                    for (const transactionData of accountData.transactions) {
                        const transaction = new Transaction();
                        transaction.date = transactionData.date;
                        transaction.id = transactionData.id;
                        transaction.code = transactionData.code;
                        transaction.type = transactionData.type;
                        transaction.debit = transactionData.debit;
                        transaction.credit = transactionData.credit;
                        transaction.balance = transactionData.balance;
                        transactions.push(transaction);
                    }
                    account.id = accountData.id;
                    account.name = accountData.name;
                    account.category = accountData.category;
                    account.tags = accountData.tags;
                    account.balance = accountData.balance;
                    account.availableBalance = accountData.availableBalance;
                    account.currency = accountData.currency;
                    account.setTransactions = transactions;

                    this.accounts.push(account);
                }

                // Update view
                this.updateDataView();
            });
        } else {
            setTimeout(this.hookSubscriptions.bind(this), 1000);
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
