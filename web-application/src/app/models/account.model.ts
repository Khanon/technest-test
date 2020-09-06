/**
 * Data model for 'Account' entity
 * 'Balance' and 'Available Balance' have BTC currency by default.
 */

import { CurrencyId } from './currency.model';
import { Transaction, AccountTransactionInterface } from './transaction.model';

export enum AccountCategories {
    NONE = 'none',
    TREASURY = 'treasury',
    REVENUE = 'revenue',
    EXPENSE = 'expense'
}

export enum AccountTags {
    TEST = 'test',
    FOREIGN = 'foreign',
    LOCAL = 'local',
    UNUSED = 'unused',
    REVISION = 'revision',
    IMPORTANT = 'important'
}

export interface AccountInterfaceBase {
    id: number;
    name: string;
    category: AccountCategories;
    tags: AccountTags[];
    balance: number;
    availableBalance: number;
    currency: CurrencyId;
}

export interface AccountInterface extends AccountInterfaceBase {
    transactions: Transaction[];
}

export interface AccountServerInterface extends AccountInterfaceBase{
    transactions: AccountTransactionInterface[];
}

export class Account {
    private data: AccountInterface = {
        id: -1,
        name: '',
        category: AccountCategories.NONE,
        tags: [],
        balance: -1,
        availableBalance: -1,
        currency: CurrencyId.BITCOIN,
        transactions: []
    };

    constructor(data?: AccountInterface) {
        if (data) {
            this.data = Object.assign({}, data);
        }
    }

    public set id(id: number) { this.data.id = id; }
    public get id(): number { return this.data.id; }

    public set name(name: string) { this.data.name = name; }
    public get name(): string { return this.data.name; }

    public set category(category: AccountCategories) { this.data.category = category; }
    public get category(): AccountCategories { return this.data.category; }

    public set tags(tags: AccountTags[]) { this.data.tags = tags; }
    public get tags(): AccountTags[] { return this.data.tags; }

    public set balance(balance: number) { this.data.balance = balance; }
    public get balance(): number { return this.data.balance; }

    public set availableBalance(availableBalance: number) { this.data.availableBalance = availableBalance; }
    public get availableBalance(): number { return this.data.availableBalance; }

    public set currency(currency: CurrencyId) { this.data.currency = currency; }
    public get currency(): CurrencyId { return this.data.currency; }

    public set setTransactions(transactions: Transaction[]) { this.data.transactions = transactions; }

    public get getBalanceCurrency(): CurrencyId { return this.data.currency; }

    public get getTransactions(): Transaction[] { return this.data.transactions; }

    public get getCategoryText(): string {
        switch (this.data.category) {
            case AccountCategories.TREASURY:
                return 'Treasury';
            case AccountCategories.REVENUE:
                return 'Revenue';
            case AccountCategories.EXPENSE:
                return 'Expense';
            default:
                return 'None';
        }
    }

    private getTagText(tag: AccountTags): string {
        switch (tag) {
            case AccountTags.TEST:
                return 'Test';
            case AccountTags.FOREIGN:
                return 'Foreign';
            case AccountTags.LOCAL:
                return 'Local';
            case AccountTags.UNUSED:
                return 'Unused';
            case AccountTags.REVISION:
                return 'Revision';
            case AccountTags.IMPORTANT:
                return 'Important';
            default:
                return 'None';
        }
    }

    public get getTagsText(): string {
        let returnText = '';
        let comma = false;
        for (const tag of this.data.tags) {
            if (comma) {
                returnText += ', ';
            } else {
                comma = true;
            }
            returnText += this.getTagText(tag);
        }

        return returnText;
    }
}
