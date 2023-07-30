import { ReactiveFormsModule } from '@angular/forms';
import {
  AccountData,
  AccountFormModalComponent,
} from './account-form-modal.component';
import { byText, createComponentFactory, Spectator } from '@ngneat/spectator';

describe('AccountFormModalComponent', () => {
  let spectator: Spectator<AccountFormModalComponent>;
  const createComponent = createComponentFactory<AccountFormModalComponent>({
    component: AccountFormModalComponent,
    imports: [ReactiveFormsModule],
  });
  const accountData: AccountData = {
    name: 'Nubank',
    currency: 'BRL',
  };

  beforeEach(() => {
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

    spectator.click('[data-testid="submit-button"]');
    expect(spectator.query('[data-testid="submit-button"]')).toBeDisabled();
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
});
