import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

export interface AccountData {
  name: string;
  currency: string;
}

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

  @Output() submitAccountForm = new EventEmitter<AccountData>();

  readonly currencies: { code: string; description: string }[] = [
    { code: 'BRL', description: 'Real' },
    { code: 'EUR', description: 'Euro' },
    { code: 'USD', description: 'Dolár' },
  ];

  constructor(private fb: NonNullableFormBuilder) {
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
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.isSubmitting = true;
      this.submitAccountForm.emit(this.form.getRawValue());
    }
  }
}
