import { Component, Inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { ButtonDirective } from '@shared/directives/button.directive';
import { Tag } from '../../models/tag';

@Component({
  selector: 'app-category-form-modal',
  standalone: true,
  imports: [ButtonDirective, ReactiveFormsModule, MatDialogClose],
  templateUrl: './tag-form-modal.component.html',
})
export class TagFormModalComponent {
  onSubmit = output<{ name: string }>();

  protected form: FormGroup<{
    name: FormControl<string>;
  }>;
  protected submitted = false;
  protected isSubmitting = false;
  protected isEditing = false;

  constructor(
    private fb: NonNullableFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { tag: Tag | undefined }
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
    });

    if (data?.tag) {
      this.isEditing = true;
      this.form.patchValue(data.tag);
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
