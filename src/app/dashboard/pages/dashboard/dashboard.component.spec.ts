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

  const dashboardApiService = jasmine.createSpyObj('DashboardApiService', [
    'getAccounts',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: DashboardApiService, useValue: dashboardApiService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should have accounts from getAccounts after component initialized', () => {
    const getAccountsSpy = dashboardApiService.getAccounts.and.returnValue(
      of(accounts)
    );
    fixture.detectChanges();

    expect(component.accounts).toBe(accounts);
    expect(getAccountsSpy.calls.any())
      .withContext('getAccounts called')
      .toBe(true);
  });

  it('should have account cards when getAccounts returns accounts', () => {
    dashboardApiService.getAccounts.and.returnValue(of(accounts));
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('app-account-card')).length
    ).toBe(accounts.length);
  });

  it('should not have accounts cards when getAccounts does not return accounts', () => {
    dashboardApiService.getAccounts.and.returnValue(of([]));
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('app-account-card')).length
    ).toBe(0);
  });

  it('should have there are no accounts paragraph when get accounts return empty ', () => {
    dashboardApiService.getAccounts.and.returnValue(of([]));
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('[data-testid="there-is-no-accounts"]'))
    ).toBeTruthy();
  });

  it('should not have there are no accounts paragraph when get accounts return accounts ', () => {
    dashboardApiService.getAccounts.and.returnValue(of(accounts));
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('[data-testid="there-is-no-accounts"]'))
    ).toBeFalsy();
  });
});
