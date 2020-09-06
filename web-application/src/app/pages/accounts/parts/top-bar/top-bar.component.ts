import { Component } from '@angular/core';
import { AccountsService } from '../../../../services/accounts.service';
import { CurrenciesService } from '../../../../services/currencies.service';
import { CurrencyId } from '../../../../models/currency.model';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
    constructor(public accountsService: AccountsService, public currencyService: CurrenciesService) { }

    getText(): string {
        return `${this.currencyService.getCurrency(CurrencyId.BITCOIN).symbol}: ${this.currencyService.getCurrency(CurrencyId.DOLLAR).symbol}${this.accountsService.exchangeRate.toFixed(2)}`;
    }
}
