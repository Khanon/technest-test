/**
 * Data model for 'Account' entity
 * 'Balance' and 'Available Balance' have BTC currency by default.
 */

import { CurrencyId } from './currency.model';
import { AccountTransactionInterface } from './transaction.model';

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

export interface AccountInterface {
    id: number;
    name: string;
    category: AccountCategories;
    tags: AccountTags[];
    balance: number;
    availableBalance: number;
    currency: CurrencyId;
    transactions: AccountTransactionInterface[];
}
