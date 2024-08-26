import { ConfirmationModalComponent } from './confirmation-modal.component';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ConfirmationModalComponent', () => {
  let spectator: Spectator<ConfirmationModalComponent>;

  const data = {
    title: 'Sample Title',
    message: 'This is a sample message.',
    confirmationLabel: 'Confirm',
  };

  const createComponent = createComponentFactory<ConfirmationModalComponent>({
    component: ConfirmationModalComponent,
    providers: [
      {
        provide: MAT_DIALOG_DATA,
        useValue: data,
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display provided data', () => {
    expect(spectator.query(byTestId('title'))).toHaveText(data.title);
    expect(spectator.query(byTestId('message'))).toHaveText(data.message);
    expect(spectator.query(byTestId('confirmationButton'))).toHaveText(
      data.confirmationLabel
    );
  });

  it('should output when confirmed button is clicked', () => {
    spyOn(spectator.component.confirmed, 'emit');

    spectator.click(byTestId('confirmationButton'));

    expect(spectator.component.confirmed.emit).toHaveBeenCalled();
  });
});
