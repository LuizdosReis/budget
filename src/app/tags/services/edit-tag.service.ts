import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { TagFormModalComponent } from '../components/tag-form-modal/tag-form-modal.component';
import { Tag } from '../models/tag';
import { TagsApiService } from './tags-api.service';

@Injectable({
  providedIn: 'root',
})
export class EditTagService {
  private readonly dialog = inject(MatDialog);
  private readonly tagsApiService = inject(TagsApiService);

  execute(tag: Tag): Observable<void> {
    const submitted = new Subject<void>();
    const dialogRef = this.dialog.open(TagFormModalComponent, {
      data: { tag },
    });

    dialogRef.componentInstance.onSubmit.subscribe(form =>
      this.tagsApiService.put(tag.id, form).subscribe(() => {
        dialogRef.close();
        submitted.next();
      })
    );

    return submitted;
  }
}
