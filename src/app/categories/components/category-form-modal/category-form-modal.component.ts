import { Component, Inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonDirective } from '@shared/directives/button.directive';
import { Category } from '../../models/category';
import { Type } from '../../models/type';

@Component({
  selector: 'app-category-form-modal',
  standalone: true,
  imports: [ButtonDirective, ReactiveFormsModule],
  templateUrl: './category-form-modal.component.html',
})
export class CategoryFormModalComponent {
  onSubmit = output<{ name: string; type: Type }>();

  protected form: FormGroup<{
    name: FormControl<string>;
    type: FormControl<Type>;
  }>;
  protected submitted = false;
  protected isSubmitting = false;
  protected readonly types: { type: Type; name: string }[] = [
    { type: Type.EXPENSE, name: 'Despesas' },
    { type: Type.INCOME, name: 'Receitas' },
  ];

  constructor(
    private fb: NonNullableFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category | undefined }
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
      type: [Type.EXPENSE, Validators.required],
    });

    if (data?.category) {
      this.form.patchValue(data.category);
    }
  }

  protected handleSubmitClick(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.isSubmitting = true;
      this.onSubmit.emit(this.form.getRawValue());
    }
  }
}
