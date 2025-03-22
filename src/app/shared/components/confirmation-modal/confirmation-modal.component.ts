import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ButtonDirective, Color } from '@shared/directives/button.directive';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ButtonDirective],
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  @Output() confirmed = new EventEmitter<void>();

  protected isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
      confirmationLabel: string;
      confirmationColor?: Color;
    }
  ) {}

  protected onConfirmedClick(): void {
    this.isLoading = true;
    this.confirmed.emit();
  }

  protected get confirmationColor(): Color {
    return this.data.confirmationColor
      ? this.data.confirmationColor
      : 'primary';
  }
}
