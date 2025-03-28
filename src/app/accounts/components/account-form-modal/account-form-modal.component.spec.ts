import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  byTestId,
  byText,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator';
import { SharedModule } from '@shared/shared.module';
import { Account } from '../../models/account';
import { AccountData } from '../../models/account-data';
import { AccountFormModalComponent } from './account-form-modal.component';

describe('AccountFormModalComponent', () => {
  let spectator: Spectator<AccountFormModalComponent>;
  const data: { account: Account | undefined } = { account: undefined };

  const createComponent = createComponentFactory<AccountFormModalComponent>({
    component: AccountFormModalComponent,
    imports: [ReactiveFormsModule, SharedModule],
    providers: [
      {
        provide: MAT_DIALOG_DATA,
        useValue: data,
      },
    ],
  });
  const accountData: AccountData = {
    name: 'Nubank',
    currency: 'BRL',
  };

  beforeEach(() => {
    data.account = undefined;
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should submits the form successfully', done => {
    const nameInput = spectator.query('#name') as HTMLInputElement;
    spectator.typeInElement(accountData.name, nameInput);

    const currentSelect = spectator.query('#currency') as HTMLSelectElement;
    spectator.selectOption(
      currentSelect,
      spectator.query(byText('Real')) as HTMLOptionElement
    );

    spectator.component.submitAccountForm.subscribe(submmitedAccountData => {
      expect(submmitedAccountData).toEqual(accountData);
      done();
    });

    spectator.click(byTestId('submit-button'));
    expect(spectator.query(byTestId('submit-button'))).toBeDisabled();
  });

  it('should not submits an invalid form', () => {
    const submitAccountFormSpy = spyOn(
      spectator.component.submitAccountForm,
      'next'
    );

    spectator.click('[data-testid="submit-button"]');
    expect(spectator.query('[data-testid="submit-button"]')).not.toBeDisabled();
    expect(submitAccountFormSpy).not.toHaveBeenCalled();
  });

  it('should show errors when tries to submit an invalid form', () => {
    spectator.click('[data-testid="submit-button"]');

    expect(
      spectator.query('[data-testid="name-input-required-error"]')
    ).toBeVisible();
    expect(
      spectator.query('[data-testid="currency-select-required-error"]')
    ).toBeVisible();
  });

  it('should show max length error when tries to submit with name bigger than 50 characters', () => {
    const nameInput = spectator.query('#name') as HTMLInputElement;
    spectator.typeInElement('a'.repeat(51), nameInput);

    spectator.click('[data-testid="submit-button"]');

    expect(
      spectator.query('[data-testid="name-input-max-length-error"]')
    ).toBeVisible();
  });

  it('should show min length error when tries to submit with name less than 5 characters', () => {
    const nameInput = spectator.query('#name') as HTMLInputElement;
    spectator.typeInElement('a'.repeat(3), nameInput);

    spectator.click('[data-testid="submit-button"]');

    expect(
      spectator.query('[data-testid="name-input-min-length-error"]')
    ).toBeVisible();
  });

  it('should initiate the form with the account values', () => {
    data.account = {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
      name: 'Nubank',
      currency: 'USD',
    };

    spectator = createComponent();

    const { name, currency } = spectator.component.form.value;
    expect(name).toEqual(data.account.name);
    expect(currency).toEqual(data.account.currency);
  });

  it('should have a delete button when is editing', () => {
    data.account = {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
      name: 'Nubank',
      currency: 'USD',
    };

    spectator = createComponent();

    expect(spectator.query(byTestId('delete-button'))).toBeVisible();
  });

  it('should not have a delete button when is not editing', () => {
    expect(spectator.query(byTestId('delete-button'))).not.toBeVisible();
  });

  it('should call onDelete when click delete button', () => {
    data.account = {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
      name: 'Nubank',
      currency: 'USD',
    };
    spectator = createComponent();
    const deleteClickedSpy = spyOn(spectator.component.deleteClicked, 'next');

    spectator.click(byTestId('delete-button'));
    expect(deleteClickedSpy).toHaveBeenCalled();
  });
});
