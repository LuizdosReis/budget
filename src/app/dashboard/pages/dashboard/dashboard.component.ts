import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import Account from '../../models/accounts';
import { DashboardApiService } from '../../services/dashboard-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  accounts?: Account[];
  accountsLoaded = false;

  constructor(private dashboardApi: DashboardApiService) {}

  ngOnInit(): void {
    this.dashboardApi.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      this.accountsLoaded = true;
    });
  }
}
