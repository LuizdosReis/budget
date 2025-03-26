import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { CategoryFormModalComponent } from '../components/category-form-modal/category-form-modal.component';
import { Category } from '../models/category';
import { CategoriesApiService } from './categories-api.service';

@Injectable({
  providedIn: 'root',
})
export class EditCategoryService {
  private readonly dialog = inject(MatDialog);
  private readonly categoriesApiService = inject(CategoriesApiService);

  execute(category: Category): Observable<void> {
    const submitted = new Subject<void>();
    const dialogRef = this.dialog.open(CategoryFormModalComponent, {
      data: { category },
    });

    dialogRef.componentInstance.onSubmit.subscribe(form =>
      this.categoriesApiService.put(category.id, form).subscribe(() => {
        dialogRef.close();
        submitted.next();
      })
    );

    return submitted;
  }
}
