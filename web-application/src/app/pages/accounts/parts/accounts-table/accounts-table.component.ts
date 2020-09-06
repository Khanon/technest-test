import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Account } from '../../../../models/account.model';
import { AccountsService } from '../../../../services/accounts.service';
import { TableDataView } from '../../../../models/view.model';
import { CurrencyId } from '../../../../models/currency.model';

@Component({
    selector: 'app-accounts-table',
    templateUrl: './accounts-table.component.html',
    styleUrls: ['./accounts-table.component.scss']
})
export class AccountsTableComponent implements OnInit {
    @Output() emitDataViewDetail = new EventEmitter<Account>();
    displayedColumns: string[];
    dataView: TableDataView<Account[]>;
    constructor(private accountsService: AccountsService) {
        this.displayedColumns = ['name', 'category', 'tags', 'balance', 'available-balance'];
    }

    ngOnInit() {
        this.dataView = this.accountsService.dataView;
    }

    onElementClick(account: Account) {
        const transactions = account.getTransactions;
        this.emitDataViewDetail.emit(account);
    }

    updateDataView() {
        this.accountsService.updateDataView();
    }

    getGlobalBalanceCurrency(): CurrencyId {
        return this.accountsService.globalBalanceCurrency;
    }

    getGlobalExchangeCurrency(): CurrencyId {
        return this.accountsService.globalExchangeCurrency;
    }

    getExchangeRate(): number {
        return this.accountsService.exchangeRate;
    }
}
