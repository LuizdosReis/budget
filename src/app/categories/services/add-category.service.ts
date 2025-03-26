import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { CategoryFormModalComponent } from '../components/category-form-modal/category-form-modal.component';
import { CategoriesApiService } from './categories-api.service';

@Injectable({
  providedIn: 'root',
})
export class AddCategoryService {
  private readonly dialog = inject(MatDialog);
  private readonly categoriesApiService = inject(CategoriesApiService);

  execute(): Observable<void> {
    const submitted = new Subject<void>();
    const dialogRef = this.dialog.open(CategoryFormModalComponent);

    dialogRef.componentInstance.onSubmit.subscribe(form =>
      this.categoriesApiService.post(form).subscribe(() => {
        dialogRef.close();
        submitted.next();
      })
    );

    return submitted;
  }
}
