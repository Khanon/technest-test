export enum AccountTransactionCodes {
    NONE = 'none',
    SETTLEMENT = 'settlement',
    ON_RAMP = 'on_ramp',
    DEPOSIT = 'deposit'
}

export enum AccountTransactionTypes {
    NONE = 'none',
    RECEIVED = 'received',
    SENT = 'sent'
}

export interface AccountTransactionInterface {
    date: string;
    id: string;
    code: AccountTransactionCodes;
    type: AccountTransactionTypes;
    debit: number;
    credit: number;
    balance: number;
}
