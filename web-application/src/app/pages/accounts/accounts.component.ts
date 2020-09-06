import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { CoreService } from '../../services/core.service';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
    accounts: Account[];
    dataViewDetailShow: boolean;
    dataViewDetailAccount: Account;

    constructor(private core: CoreService) {
        this.dataViewDetailShow = false;
    }

    ngOnInit(): void {
    }

    isSocketConnected(): boolean {
        return this.core.isSocketConnected();
    }

    onDataViewDetail(account: Account): void {
        this.dataViewDetailShow = true;
        this.dataViewDetailAccount = account;
    }

    detailsViewOnclose() {
        this.dataViewDetailShow = false;
    }
}
