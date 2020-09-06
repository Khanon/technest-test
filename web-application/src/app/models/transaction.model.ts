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

export class Transaction {
    public data: AccountTransactionInterface = {
        date: 'no_date',
        id: 'no_id',
        code: AccountTransactionCodes.NONE,
        type: AccountTransactionTypes.NONE,
        debit: -1,
        credit: -1,
        balance: -1,
    };

    constructor(data?: AccountTransactionInterface) {
        if (data) {
            this.data = Object.assign({}, data);
        }
    }

    public set date(date: string) { this.data.date = date; }
    public get date(): string { return this.data.date; }

    public set id(id: string) { this.data.id = id; }
    public get id(): string { return this.data.id; }

    public set code(code: AccountTransactionCodes) { this.data.code = code; }
    public get code(): AccountTransactionCodes { return this.data.code; }

    public set type(type: AccountTransactionTypes) { this.data.type = type; }
    public get type(): AccountTransactionTypes { return this.data.type; }

    public set debit(debit: number) { this.data.debit = debit; }
    public get debit(): number { return this.data.debit; }

    public set credit(credit: number) { this.data.credit = credit; }
    public get credit(): number { return this.data.credit; }

    public set balance(balance: number) { this.data.balance = balance; }
    public get balance(): number { return this.data.balance; }

    public get getCodeText(): string {
        switch (this.data.code) {
            case AccountTransactionCodes.SETTLEMENT:
                return 'Settlement';
            case AccountTransactionCodes.ON_RAMP:
                return 'On Ramp';
            case AccountTransactionCodes.DEPOSIT:
                return 'Deposit';
            default:
                return 'None';
        }
    }

    public get getTypeText(): string {
        switch (this.data.type) {
            case AccountTransactionTypes.RECEIVED:
                return 'Received';
            case AccountTransactionTypes.SENT:
                return 'Sent';
            default:
                return 'None';
        }
    }
}
