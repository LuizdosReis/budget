import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, switchMap } from 'rxjs';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { Category } from '../models/Category';
import { CategoriesApiService } from '../services/categories-api.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteCategoryService {
  dialog = inject(MatDialog);
  categoriesApiService = inject(CategoriesApiService);

  constructor() {}

  execute(category: Category): Observable<void> {
    const deleted = new Subject<void>();
    const matDialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Deletar categoria',
        message: `Tem certeza que deseja deletar  ${category.name}?`,
        confirmationLabel: 'Deletar',
        confirmationColor: 'danger',
      },
    });

    matDialogRef.componentInstance.confirmed
      .pipe(switchMap(() => this.categoriesApiService.delete(category.id)))
      .subscribe(() => {
        deleted.next();
        matDialogRef.close();
      });
    return deleted;
  }
}
