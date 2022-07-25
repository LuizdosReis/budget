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
  monthsYearsLoaded = false;
  monthsYears: MonthYear[] = [];
  currentMonthYear!: MonthYear;

  constructor(private dashboardApi: DashboardApiService) {}

  ngOnInit(): void {
    const date = new Date();
    this.currentMonthYear = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    };
    this.loadMonthsYears();
    this.loadAccounts(this.currentMonthYear);
  }

  loadMonthsYears(): void {
    this.dashboardApi.getMonthYears().subscribe((monthsYears: MonthYear[]) => {
      this.monthsYears = monthsYears;
      this.monthsYearsLoaded = true;
    });
  }

  loadAccounts(monthYear: MonthYear): void {
    this.accountsLoaded = false;
    this.dashboardApi.getAccounts(monthYear).subscribe(accounts => {
      this.accounts = accounts;
      this.accountsLoaded = true;
    });
  }

  selectMonthYear(monthYear: MonthYear): void {
    this.currentMonthYear = monthYear;
    this.loadAccounts(this.currentMonthYear);
  }
}
