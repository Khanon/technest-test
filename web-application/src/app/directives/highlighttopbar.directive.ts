import { Directive, ElementRef, Input, HostBinding } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[appHighlightTopBar]'
})
export class HighlightTopBarDirective {
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
        this.onNewExchangeRateValue$ = this.accountsService.obsUpdateExchangeRate$.subscribe(diff => {
            this.pElementClass = [];
            if (diff > 0) {
                this.pElementClass.push('blinking-green');
            } else if (diff < 0) {
                this.pElementClass.push('blinking-red');
            }
            setTimeout(() => {
                this.pElementClass = [];
            }, 3000);
        });
    }
}
