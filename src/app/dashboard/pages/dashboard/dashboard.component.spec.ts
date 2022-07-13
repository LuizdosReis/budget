import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import Account from '../../models/accounts';
import { DashboardApiService } from '../../services/dashboard-api.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const accounts: Account[] = [
    new Account({
      name: 'Nubank',
      currencyCode: 'BRL',
      currentBalance: 5,
      expectedBalance: 20,
      monthlyBalance: 2,
      deposits: [],
      withdrawals: [],
    }),
    new Account({
      name: 'Nubank',
      currencyCode: 'BRL',
      currentBalance: 5,
      expectedBalance: 20,
      monthlyBalance: 2,
      deposits: [],
      withdrawals: [],
    }),
  ];

  const dashboardApiServiceSpy = jasmine.createSpyObj('DashboardApiService', [
    'getAccounts',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: DashboardApiService, useValue: dashboardApiServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('accounts in component should be equal the accounts return by dashboardApiService', () => {
    dashboardApiServiceSpy.getAccounts.and.returnValue(of(accounts));
    fixture.detectChanges();

    expect(component.accounts).toBe(accounts);
  });

  it('accounts and accounts card should have the same length', () => {
    dashboardApiServiceSpy.getAccounts.and.returnValue(of(accounts));
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('app-account-card')).length
    ).toBe(accounts.length);
  });

  it('should not have accounts cards when dashboardApiService getAccounts does not return accounts', () => {
    dashboardApiServiceSpy.getAccounts.and.returnValue(of([]));
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('app-account-card')).length
    ).toBe(0);
  });
});
