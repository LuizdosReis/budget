import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  byTestId,
  byText,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator';
import { Category } from '../../models/category';
import { Type } from '../../models/type';
import { CategoryFormModalComponent } from './category-form-modal.component';

describe('CategoryFormModalComponent', () => {
  let spectator: Spectator<CategoryFormModalComponent>;
  const data: { category: Category | undefined } = { category: undefined };

  const createComponent = createComponentFactory<CategoryFormModalComponent>({
    component: CategoryFormModalComponent,
    providers: [
      {
        provide: MAT_DIALOG_DATA,
        useValue: data,
      },
    ],
  });

  beforeEach(() => {
    data.category = undefined;
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should submit the form successfully', done => {
    const nameInput = spectator.query('#name') as HTMLInputElement;
    spectator.typeInElement('category', nameInput);

    const currentSelect = spectator.query('#type') as HTMLSelectElement;
    spectator.selectOption(
      currentSelect,
      spectator.query(byText('Despesas')) as HTMLOptionElement
    );

    spectator.component.onSubmit.subscribe(form => {
      expect(form).toEqual({
        name: 'category',
        type: Type.EXPENSE,
      });
      done();
    });

    spectator.click(byTestId('submit-button'));
    expect(spectator.query(byTestId('submit-button'))).toBeDisabled();
  });

  it('should not submit an invalid form', () => {
    const submitAccountFormSpy = spyOn(spectator.component.onSubmit, 'emit');

    spectator.click(byTestId('submit-button'));
    expect(spectator.query(byTestId('submit-button'))).not.toBeDisabled();
    expect(submitAccountFormSpy).not.toHaveBeenCalled();
  });

  it('should show error when tries to submit an invalid form', () => {
    spectator.click(byTestId('submit-button'));

    expect(
      spectator.query(byTestId('name-input-required-error'))
    ).toBeVisible();
  });

  it('should show max length error when tries to submit with name bigger than 50 characters', () => {
    const nameInput = spectator.query('#name') as HTMLInputElement;
    spectator.typeInElement('a'.repeat(51), nameInput);

    spectator.click(byTestId('submit-button'));

    expect(
      spectator.query(byTestId('name-input-max-length-error'))
    ).toBeVisible();
  });

  it('should show min length error when tries to submit with name less than 5 characters', () => {
    const nameInput = spectator.query('#name') as HTMLInputElement;
    spectator.typeInElement('a'.repeat(3), nameInput);

    spectator.click(byTestId('submit-button'));

    expect(
      spectator.query(byTestId('name-input-min-length-error'))
    ).toBeVisible();
  });
});
