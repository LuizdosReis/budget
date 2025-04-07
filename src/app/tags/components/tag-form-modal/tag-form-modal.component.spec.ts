import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { Tag } from '../../models/tag';
import { TagFormModalComponent } from './tag-form-modal.component';

describe('TagFormModalComponent', () => {
  let spectator: Spectator<TagFormModalComponent>;
  const data: { tag: Tag | undefined } = { tag: undefined };

  const createComponent = createComponentFactory<TagFormModalComponent>({
    component: TagFormModalComponent,
    providers: [
      {
        provide: MAT_DIALOG_DATA,
        useValue: data,
      },
    ],
  });

  beforeEach(() => {
    data.tag = undefined;
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should submit the form successfully', done => {
    const nameInput = spectator.query('#name') as HTMLInputElement;
    spectator.typeInElement('new_tag', nameInput);

    spectator.component.onSubmit.subscribe(form => {
      expect(form).toEqual({
        name: 'new_tag',
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

  it("should show 'alterar' button text when is editing", () => {
    data.tag = {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
      name: 'tag_name',
    };
    spectator = createComponent();
    expect(spectator.query(byTestId('submit-button'))).toHaveText('Alterar');
  });

  it("should show 'adicionar' button text when is adding", () => {
    expect(spectator.query(byTestId('submit-button'))).toHaveText('Adicionar');
  });
});
