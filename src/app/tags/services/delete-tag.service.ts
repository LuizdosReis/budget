import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, switchMap } from 'rxjs';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { Tag } from '../models/tag';
import { TagsApiService } from './tags-api.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteTagService {
  dialog = inject(MatDialog);
  tagsApiService = inject(TagsApiService);

  constructor() {}

  execute(tag: Tag): Observable<void> {
    const deleted = new Subject<void>();
    const matDialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Deletar tag',
        message: `Tem certeza que deseja deletar  ${tag.name}?`,
        confirmationLabel: 'Deletar',
        confirmationColor: 'danger',
      },
    });

    matDialogRef.componentInstance.confirmed
      .pipe(switchMap(() => this.tagsApiService.delete(tag.id)))
      .subscribe(() => {
        deleted.next();
        matDialogRef.close();
      });
    return deleted;
  }
}
