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

  constructor(private core: CoreService) {
  }

  ngOnInit(): void {
  }

  isServerAlive(): boolean {
      return this.core.isServerAlive();
  }
}
