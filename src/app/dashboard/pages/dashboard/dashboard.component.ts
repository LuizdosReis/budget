import { Component, OnInit } from '@angular/core';
import Account from '../../models/accounts';
import { MonthYear } from '../../models/monthYear';
import { DashboardApiService } from '../../services/dashboard-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  accounts?: Account[];
  accountsLoaded = false;
  monthYear?: MonthYear;

  constructor(private dashboardApi: DashboardApiService) {}

  ngOnInit(): void {
    const date = new Date();
    this.monthYear = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    };

    this.dashboardApi.getAccounts(this.monthYear).subscribe(accounts => {
      this.accounts = accounts;
      this.accountsLoaded = true;
    });
  }
}
