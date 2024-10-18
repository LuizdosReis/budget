import { TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Account } from '../models/accounts';
import { MonthYear } from '../models/monthYear';
import { DashboardApiService } from './dashboard-api.service';

describe('DashboardApiService', () => {
  let service: DashboardApiService;
  let httpController: HttpTestingController;

  const fakeAccounts = [
    {
      year: 2022,
      month: 7,
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
    },
  ];

  const fakeMonthsYears: MonthYear[] = [
    {
      year: 2022,
      month: 7,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(DashboardApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAccounts with year and month and return an array of accounts', done => {
    const monthYear: MonthYear = {
      year: 2022,
      month: 7,
    };

    service.getAccounts(monthYear).subscribe((accounts: Account[]) => {
      expect(accounts.length).toBe(fakeAccounts.length);
      done();
    });

    const expectedUrl = `${service.URL}/accounts?year=${monthYear.year}&month=${monthYear.month}`;

    const req = httpController.expectOne({
      method: 'GET',
      url: expectedUrl,
    });

    req.flush(fakeAccounts);
  });

  it('should call getMonthsYears and return an array of monthsYears', done => {
    service.getMonthsYears().subscribe((monthsYears: MonthYear[]) => {
      expect(monthsYears.length).toBe(fakeMonthsYears.length);
      done();
    });

    const expectedUrl = `${service.URL}/months-years`;

    const req = httpController.expectOne({
      method: 'GET',
      url: expectedUrl,
    });

    req.flush(fakeMonthsYears);
  });
});
