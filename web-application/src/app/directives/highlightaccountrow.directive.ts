import { Directive, ElementRef, Input, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountsService } from '../services/accounts.service';

@Directive({
  selector: '[appHighlightAccountRow]'
})
export class HighlightAccountRowDirective {
    protected pElementClass: string[] = [];
    onNewExchangeRateValue$: Subscription;

    @Input('class')
    @HostBinding('class')
    get elementClass(): string {
        return this.pElementClass.join(' ');
    }
    set(val: string) {
        this.pElementClass = val.split(' ');
    }

    constructor(private el: ElementRef, private accountsService: AccountsService) {
        // Get element row, check if the BTC Price is higher or lower and apply highlight?
        // Isn't the BTC price the same for all rows?

        /*this.onNewExchangeRateValue$ = this.accountsService.obsUpdateExchangeRate$.subscribe(diff => {
            this.pElementClass = [];
            if (diff > 0) {
                this.pElementClass.push('blinking-green');
            } else if (diff < 0) {
                this.pElementClass.push('blinking-red');
            }
            setTimeout(() => {
                this.pElementClass = [];
            }, 3000);
        });*/
    }
}
