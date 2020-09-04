/**
 * Data model for 'Account' entity
 * 'Balance' and 'Available Balance' has BTC currency by default.
 */

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

export class Account {
    name: string;
    category: AccountCategories;
    tags: AccountTags[];
    balance: number;
    availableBalance: number;

    constructor() {
        this.name = '';
        this.category = AccountCategories.NONE;
        this.tags = [];
        this.balance = -1;
        this.availableBalance = -1;
    }
}
