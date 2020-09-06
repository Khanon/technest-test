import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyId, CurrencySymbolPosition } from '../models/currency.model';
import { CurrenciesService } from '../services/currencies.service';

@Pipe({
    name: 'currencyValue'
})
export class CurrencyValuePipe implements PipeTransform {
    constructor(private currenciesService: CurrenciesService) {}
    transform(value: number, currencyId: CurrencyId, exchangeRate?: number): unknown {
        const currency = this.currenciesService.getCurrency(currencyId);
        if (exchangeRate) {
            value *= exchangeRate;
        }
        const showValue: string = value.toFixed(2);
        return `${(currency.symbolPosition === CurrencySymbolPosition.BEFORE) ? currency.symbol : ''}${showValue} ${(currency.symbolPosition === CurrencySymbolPosition.AFTER) ? currency.symbol : ''}`;
    }
}
