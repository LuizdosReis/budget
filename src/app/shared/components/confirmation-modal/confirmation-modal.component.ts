import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ButtonDirective } from '@shared/directives/button.directive';

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
    public data: { title: string; message: string; confirmationLabel: string }
  ) {}

  protected handleConfirmedClick(): void {
    this.isLoading = true;
    this.confirmed.emit();
  }
}
