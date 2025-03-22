import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../../models/account';
import { AccountData } from '../../models/account-data';

@Component({
  selector: 'app-account-form-modal',
  templateUrl: './account-form-modal.component.html',
  styleUrls: ['./account-form-modal.component.scss'],
})
export class AccountFormModalComponent {
  form: FormGroup<{
    name: FormControl<string>;
    currency: FormControl<string>;
  }>;
  submitted = false;
  isSubmitting = false;
  isEditing = false;

  @Output() submitAccountForm = new EventEmitter<AccountData>();
  @Output() deleteClicked = new EventEmitter<void>();

  readonly currencies: { code: string; description: string }[] = [
    { code: 'BRL', description: 'Real' },
    { code: 'EUR', description: 'Euro' },
    { code: 'USD', description: 'Dolár' },
  ];

  constructor(
    private fb: NonNullableFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { account: Account | undefined }
  ) {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      currency: ['', Validators.required],
    });

    if (data?.account) {
      this.isEditing = true;
      this.form.patchValue(data.account);
    }
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.isSubmitting = true;
      this.submitAccountForm.emit(this.form.getRawValue());
    }
  }
}
