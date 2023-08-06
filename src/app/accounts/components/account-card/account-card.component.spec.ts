import { EditAccountService } from '@app/accounts/services/edit-account.service';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';
import { Account } from './../../models/account';
import { AccountCardComponent } from './account-card.component';

describe('AccountCardComponent', () => {
  let spectator: Spectator<AccountCardComponent>;
  const createComponent = createComponentFactory<AccountCardComponent>({
    component: AccountCardComponent,
    mocks: [EditAccountService],
  });

  const account: Account = {
    id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
    name: 'Nubank',
    currency: 'BRL',
  };

  beforeEach(() => {
    spectator = createComponent({ props: { account } });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('emits edited events when clicks', () => {
    const editAccountServiceSpy = spectator.inject(EditAccountService);

    editAccountServiceSpy.run.and.returnValue(of(undefined));

    const editedNextSpy = spyOn(spectator.component.edited, 'next');

    spectator.click('[data-testid="edit-button"]');

    expect(editAccountServiceSpy.run).toHaveBeenCalledWith(account);
    expect(editedNextSpy).toHaveBeenCalled();
  });
});
