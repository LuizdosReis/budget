import { ComponentFixture, TestBed } from '@angular/core/testing';
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
  ];

  const fakeDashboardApiService = jasmine.createSpyObj<DashboardApiService>(
    'dashboardApiService',
    {
      getAccounts: of(accounts),
    }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: DashboardApiService, useValue: fakeDashboardApiService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
