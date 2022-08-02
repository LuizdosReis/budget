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
    'getMonthsYears',
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
    dashboardApiService.getMonthsYears.and.returnValue(of(monthsYears));

    getAccountsSpy = dashboardApiService.getAccounts.and.returnValue(
      of(accounts)
    );
  });

  it('should have accounts from getAccounts after component initialized', () => {
    fixture.detectChanges();

    expect(component.accounts).toBe(accounts);
  });

  it('should call getAccounts with currentMonthYear after component initialized', () => {
    fixture.detectChanges();

    expect(component.accounts).toBe(accounts);
    expect(getAccountsSpy).toHaveBeenCalledWith(component.currentMonthYear);
  });

  it('should have monthsYears from getMonthYears after component initialized', () => {
    fixture.detectChanges();

    expect(component.monthsYears).toBe(monthsYears);
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
    dashboardApiService.getMonthsYears.and.returnValue(of([]));
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
    dashboardApiService.getMonthsYears.and.returnValue(
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

  it('should set accountsLoaded to false when month swipper raises selectMonthYear event', fakeAsync(() => {
    dashboardApiService.getAccounts.and.returnValue(
      of(accounts).pipe(delay(1))
    );

    fixture.detectChanges();

    const monthYear: MonthYear = {
      year: 2022,
      month: 9,
    };

    fixture.debugElement
      .query(By.css('app-month-swiper'))
      .triggerEventHandler('selectMonthYear', monthYear);

    expect(component.accountsLoaded).toBeFalse();

    tick(1);

    expect(component.accountsLoaded).toBeTrue();
  }));

  it('should call getAccounts when month swipper raises selectMonthYear event', () => {
    fixture.detectChanges();

    const monthYear: MonthYear = {
      year: 2022,
      month: 9,
    };

    fixture.debugElement
      .query(By.css('app-month-swiper'))
      .triggerEventHandler('selectMonthYear', monthYear);

    expect(getAccountsSpy).toHaveBeenCalledWith(monthYear);
  });
});
