import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../../../../models/transaction.model';
import { AccountsService } from '../../../../services/accounts.service';
import { CurrencyId } from '../../../../models/currency.model';
import { Account } from '../../../../models/account.model';
import { TableDataView } from '../../../../models/view.model';
@Component({
    selector: 'app-account-details',
    templateUrl: './account-details.component.html',
    styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
    @Input() account: Account;
    @Output() emitDetailsViewOnClose = new EventEmitter<void>();
    dataViewDetail: TableDataView<Transaction[]>;
    displayedColumns: string[];

    constructor(private accountsService: AccountsService) {
        this.displayedColumns = ['date', 'id', 'code', 'type', 'debit', 'credit', 'balance'];
    }

    ngOnInit(): void {
        this.dataViewDetail = {
            length: this.account.getTransactions.length,
            pageIndex: 0,
            pageSize: 8,
            pageSizeOptions: [],
            data: []
        };
        this.updateDataViewDetail();
    }

    updateDataViewDetail() {
        const transactions = this.account.getTransactions;
        this.dataViewDetail.length = transactions.length;
        const pageIndex = this.dataViewDetail.pageIndex * this.dataViewDetail.pageSize;
        this.dataViewDetail.data = transactions.filter((transaction, index) => index >= pageIndex && index < pageIndex + this.dataViewDetail.pageSize);
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

    onClose() {
        this.emitDetailsViewOnClose.emit();
    }
}
