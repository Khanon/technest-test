import { Injectable } from '@angular/core';
import { Currency, CurrencyId, CurrencyInterface } from '../models/currency.model';

@Injectable({
    providedIn: 'root'
})
export class CurrenciesService {
    currency: Currency;
    constructor() {
        this.currency = new Currency();
    }

    getCurrency(id: CurrencyId): CurrencyInterface {
        return this.currency.getCurrency(id);
    }
}
