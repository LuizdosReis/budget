import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { ButtonDirective } from '@shared/directives/button.directive';
import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let spectator: Spectator<ConfirmationModalComponent>;

  const data: {
    title: string;
    message: string;
    confirmationLabel: string;
    confirmationColor?: string;
  } = {
    title: 'Sample Title',
    message: 'This is a sample message.',
    confirmationLabel: 'Confirm',
  };

  const createComponent = createComponentFactory<ConfirmationModalComponent>({
    component: ConfirmationModalComponent,
    overrideComponents: [
      [
        ConfirmationModalComponent,
        {
          remove: {
            imports: [ButtonDirective],
          },
          add: {
            schemas: [NO_ERRORS_SCHEMA],
          },
        },
      ],
    ],
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

  it('should set property color when data is provided', () => {
    data.confirmationColor = 'secondary';
    spectator.detectChanges();
    expect(
      spectator.debugElement.query(By.css('[data-testid="confirmationButton"]'))
        .nativeElement
    ).toHaveProperty('color', data.confirmationColor);
  });

  it('should set primary color when data is not provided', () => {
    data.confirmationColor = undefined;
    expect(
      spectator.debugElement.query(By.css('[data-testid="confirmationButton"]'))
        .nativeElement
    ).toHaveProperty('color', 'primary');
  });

  it('should output when confirmed button is clicked', () => {
    spyOn(spectator.component.confirmed, 'emit');

    spectator.click(byTestId('confirmationButton'));

    expect(spectator.component.confirmed.emit).toHaveBeenCalled();
  });
});
