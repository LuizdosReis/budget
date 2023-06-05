import { Component, EventEmitter, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-account-form-modal',
  templateUrl: './account-form-modal.component.html',
  styleUrls: ['./account-form-modal.component.scss'],
})
export class AccountFormModalComponent {
  form: UntypedFormGroup;
  submitted = false;
  isSubmitting = false;

  @Output() submitAccountForm = new EventEmitter<any>();

  readonly currencies: { code: string; description: string }[] = [
    { code: 'BRL', description: 'Real' },
    { code: 'EUR', description: 'Euro' },
    { code: 'USD', description: 'Dolár' },
  ];

  constructor(fb: UntypedFormBuilder) {
    this.form = fb.group({
      name: fb.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      currency: fb.control('', Validators.required),
    });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.submitAccountForm.emit(this.form.value);
      this.isSubmitting = true;
    }
  }
}
