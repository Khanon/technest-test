export enum CurrencyId {
    BITCOIN = 'bitcoin',
    DOLLAR = 'dollar',
}

export enum CurrencySymbolPosition {
    BEFORE = 'before',
    AFTER = 'after'
}

export interface CurrencyInterface {
    id: CurrencyId;
    name: string;
    symbol: string;
    symbolPosition: CurrencySymbolPosition;
}

export class Currency {
    private currencies: CurrencyInterface[] = [
        { id: CurrencyId.BITCOIN, name: 'Bitcoin', symbol: 'BTC', symbolPosition: CurrencySymbolPosition.AFTER },
        { id: CurrencyId.DOLLAR, name: 'Dollar', symbol: '$', symbolPosition: CurrencySymbolPosition.BEFORE }
    ];

    getCurrency(id: CurrencyId): CurrencyInterface {
        return this.currencies.find(currency => currency.id === id);
    }
}
