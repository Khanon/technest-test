import { SocketBase, SocketEvents } from '../models/socket.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountCategories, AccountTags, AccountServerInterface } from '../models/account.model';
import { CurrencyId } from '../models/currency.model';
import { AccountTransactionCodes, AccountTransactionTypes, AccountTransactionInterface } from '../models/transaction.model';

/**
 * Mock socket - Test
 * It simulates what server Socket would stream.
 */

export class SocketMock extends SocketBase {
    /** Mock data */
    exchangeRate: number;
    mockAccounts: AccountServerInterface[];

    /** Observables */
    obsOnAccounts$: BehaviorSubject<AccountServerInterface[]>;
    obsOnExchangeRate$: BehaviorSubject<number>;
    obsUpdateExchangeRate$: BehaviorSubject<number>; // Stream the difference with currenet value

    constructor() {
        super({ url: '' });
        console.log('Socket: Mock socket, test without server.');

        // Create mock exchange rate
        this.exchangeRate = 1.70;

        // Create mock accounts
        this.mockAccounts = [];
        let index = 0;
        do {
            this.mockAccounts.push(this.getRandomAccount(index));
            index++;
        } while (index < 50);

        // Create observables
        this.obsOnAccounts$ = new BehaviorSubject<AccountServerInterface[]>(this.mockAccounts);
        this.obsOnExchangeRate$ = new BehaviorSubject<number>(this.exchangeRate);
        this.obsUpdateExchangeRate$ = new BehaviorSubject<number>(this.exchangeRate);

        // Send random Exchange Rate value every 15 seconds
        this.sendRandomExchangeRate(15000);

        // Send random accounts
        this.sendRandomAccounts();
    }

    isConnected(): boolean {
        return true;
    }

    emit(eventName: SocketEvents, ...args: any[]) {
        switch (eventName) {
            case SocketEvents.GET_ACCOUNTS:
                this.obsOnAccounts$.next(this.mockAccounts);
                break;
            case SocketEvents.GET_EXCHANGE_RATE:
                this.obsOnExchangeRate$.next(this.exchangeRate);
                break;
        }
    }

    fromEvent<T>(eventName: SocketEvents): Observable<T> {
        switch (eventName) {
            case SocketEvents.ON_ACCOUNTS:
                return this.obsOnAccounts$ as Observable<any>;
            case SocketEvents.ON_EXCHANGE_RATE:
                return this.obsOnExchangeRate$ as Observable<any>;
            default:
                return null;
        }
    }

    sendRandomExchangeRate(interval: number) {
        setInterval(() => {
            this.exchangeRate = Math.random() * 3;
            this.emit(SocketEvents.GET_EXCHANGE_RATE);
        }, interval);
    }

    sendRandomAccounts() {
        setTimeout(() => {
            for (const account of this.mockAccounts) {
                if (Math.random() < 0.5) {
                    account.balance *= Math.random() + 0.5;
                    account.availableBalance = account.balance / 2;
                }
            }
            this.emit(SocketEvents.GET_ACCOUNTS);
            this.sendRandomAccounts();
        }, (Math.random() * 10 + 5) * 1000);
    }

    private getRandomAccount(index: number): AccountServerInterface {
        const transactions: AccountTransactionInterface[] = [];
        let timestamp: number = 1577899532 * 1000; // Dates from 1/1/2020
        let indexT = Math.round(Math.random() * 30);
        do {
            timestamp += Math.round(Math.random() * 1000000000);
            transactions.push(this.getRandomTransaction(timestamp));
            indexT--;
        } while (indexT > 0);

        const rcategory = Math.random();
        const category = (rcategory < 0.33) ? AccountCategories.EXPENSE :
                         (rcategory < 0.66) ? AccountCategories.REVENUE :
                                              AccountCategories.TREASURY;
        const rtags = Math.random();
        const tags = (rtags < 0.2) ? [AccountTags.FOREIGN, AccountTags.IMPORTANT] :
                     (rtags < 0.4) ? [AccountTags.LOCAL, AccountTags.UNUSED] :
                     (rtags < 0.6) ? [AccountTags.TEST] :
                     (rtags < 0.8) ? [AccountTags.LOCAL, AccountTags.IMPORTANT] :
                                     [AccountTags.REVISION, AccountTags.IMPORTANT];

        const balanceValue = (Math.random() + 1) * 100;
        return {
            id: index,
            name: `Mock Account ${index}`,
            category,
            tags,
            balance: balanceValue,
            availableBalance: balanceValue / 2,
            currency: CurrencyId.BITCOIN,
            transactions
        };
    }

    private getRandomTransaction(timestamp: number): AccountTransactionInterface {
        const rcode = Math.random();
        const code = (rcode < 0.33) ? AccountTransactionCodes.DEPOSIT :
            (rcode < 0.66) ? AccountTransactionCodes.ON_RAMP :
                AccountTransactionCodes.SETTLEMENT;
        const rtype = Math.random();
        const type = (rtype < 0.5) ? AccountTransactionTypes.RECEIVED :
            AccountTransactionTypes.SENT;
        return {
            date: this.getDateString(timestamp),
            id: timestamp.toString(),
            code,
            type,
            debit: Math.random() * 100000,
            credit: Math.random() * 100000,
            balance: Math.random() * 100000
        };
    }

    private getDateString(datetime: number): string {
        const date = new Date(datetime);
        const todate = date.getDate();
        const tomonth = date.getMonth() + 1;
        const toyear = date.getFullYear();
        return `${todate}/${tomonth}/${toyear}`;
    }
}
