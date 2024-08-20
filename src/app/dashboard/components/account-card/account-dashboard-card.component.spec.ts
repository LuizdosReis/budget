import { Account } from '../../models/accounts';

import { AccountDashboardCardComponent } from './account-dashboard-card.component';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { MatDialog } from '@angular/material/dialog';
import { AccountModalComponent } from '../account-modal/account-modal.component';

describe('AccountDashboardCardComponent', () => {
  let spectator: Spectator<AccountDashboardCardComponent>;

  const createComponent = createComponentFactory<AccountDashboardCardComponent>(
    {
      component: AccountDashboardCardComponent,
      mocks: [MatDialog],
    }
  );

  const account = new Account({
    name: 'Nubank',
    currencyCode: 'BRL',
    currentBalance: 5,
    expectedBalance: 20,
    monthlyBalance: 2,
    deposits: [],
    withdrawals: [],
  });

  beforeEach(() => {
    spectator = createComponent({ props: { account } });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should open dialog with account', () => {
    spectator.click(byTestId('account-dashboard-card'));

    expect(spectator.inject(MatDialog).open).toHaveBeenCalledWith(
      AccountModalComponent,
      {
        data: {
          account,
        },
      }
    );
  });
});
