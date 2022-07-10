import { Component } from '@angular/core';
import Account from '../../models/accounts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  accounts: Account[] = [
    new Account({
      name: 'Nubank',
      currencyCode: 'BRL',
      currentBalance: 5,
      expectedBalance: 20,
      monthlyBalance: 2,
      deposits: [
        {
          name: 'Income',
          status: 'Received',
          amount: 100,
          order: 1,
        },
        {
          name: 'Income',
          status: 'Scheduled',
          amount: 50,
          order: 2,
        },
        {
          name: 'Income',
          status: '',
          amount: 50.5,
        },
        {
          name: 'Redeemed',
          status: 'Received',
          amount: 100,
          order: 1,
        },
        {
          name: 'Redeemed',
          status: 'Scheduled',
          amount: 20,
          order: 2,
        },
      ],
      withdrawals: [
        {
          name: 'Expense',
          status: 'Paid',
          amount: 100,
          order: 1,
        },
        {
          name: 'Expense',
          status: '',
          amount: 100,
        },
        {
          name: 'Expense',
          status: 'Scheduled',
          amount: 100,
          order: 2,
        },
      ],
    }),
  ];
}
