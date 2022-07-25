import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { delay, of } from 'rxjs';
import Account from '../../models/accounts';
import { MonthYear } from '../../models/monthYear';
import { DashboardApiService } from '../../services/dashboard-api.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let getMonthYearsSpy: any;
  let getAccountsSpy: any;

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

  const monthsYears: MonthYear[] = [
    {
      year: 2022,
      month: 7,
    },
  ];

  const dashboardApiService = jasmine.createSpyObj('DashboardApiService', [
    'getAccounts',
    'getMonthYears',
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

  beforeEach(() => {
    getMonthYearsSpy = dashboardApiService.getMonthYears.and.returnValue(
      of(monthsYears)
    );

    getAccountsSpy = dashboardApiService.getAccounts.and.returnValue(
      of(accounts)
    );
  });

  it('should have accounts from getAccounts after component initialized', () => {
    fixture.detectChanges();

    expect(component.accounts).toBe(accounts);
    expect(getAccountsSpy.calls.any())
      .withContext('getAccounts called')
      .toBe(true);
  });

  it('should have monthsYears from getMonthYears after component initialized', () => {
    fixture.detectChanges();

    expect(component.monthsYears).toBe(monthsYears);
    expect(getMonthYearsSpy.calls.any())
      .withContext('getMonthYears called')
      .toBe(true);
  });

  it('should have account cards when getAccounts returns accounts', () => {
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('app-account-card')).length
    ).toBe(accounts.length);
  });

  it('should have month swipper when getMonthYears returns monthsYears', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-month-swiper'))).toBeTruthy();
  });

  it('should not have accounts cards when getAccounts does not return accounts', () => {
    dashboardApiService.getAccounts.and.returnValue(of([]));
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('app-account-card')).length
    ).toBe(0);
  });

  it('should not have month swipper when getMonthYears does not return monthsYears', () => {
    dashboardApiService.getMonthYears.and.returnValue(of([]));
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-month-swiper'))).toBeFalsy();
  });

  it('should have there are no accounts paragraph when get accounts return empty ', () => {
    dashboardApiService.getAccounts.and.returnValue(of([]));
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('[data-testid="there-is-no-accounts"]'))
    ).toBeTruthy();
  });

  it('should not have there are no accounts paragraph when get accounts return accounts ', () => {
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('[data-testid="there-is-no-accounts"]'))
    ).toBeFalsy();
  });

  it('should have account card skeleton when starts', fakeAsync(() => {
    dashboardApiService.getAccounts.and.returnValue(
      of(accounts).pipe(delay(1))
    );

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-account-card-skeleton')))
      .withContext('start with skeleton')
      .toBeTruthy();

    tick(1);

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-account-card-skeleton')))
      .withContext('without skeleton after get accounts returns')
      .toBeFalsy();
  }));

  it('should have month swiper skeleton when starts', fakeAsync(() => {
    dashboardApiService.getMonthYears.and.returnValue(
      of(monthsYears).pipe(delay(1))
    );

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-month-swiper-skeleton')))
      .withContext('start with skeleton')
      .toBeTruthy();

    tick(1);

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-month-swiper-skeleton')))
      .withContext('without skeleton after get month years returns')
      .toBeFalsy();
  }));
});
