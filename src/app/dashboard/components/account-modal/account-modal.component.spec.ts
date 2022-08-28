import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { Account } from '../../models/accounts';
import { AccountModalComponent } from './account-modal.component';

describe('AccountModalComponent', () => {
  let component: AccountModalComponent;
  let fixture: ComponentFixture<AccountModalComponent>;

  const account = new Account({
    name: 'Nubank',
    currencyCode: 'BRL',
    currentBalance: 5,
    expectedBalance: 20,
    monthlyBalance: 2,
    deposits: [],
    withdrawals: [],
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountModalComponent],
      imports: [SharedModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { account },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
