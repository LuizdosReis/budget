import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonDirective } from '@shared/directives/button.directive';
import { Tag } from '../../models/tag';
import { DeleteTagService } from '../../services/delete-tag.service';

@Component({
  selector: 'app-tag-card',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './tag-card.component.html',
})
export class TagCardComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly deleteCategoryService = inject(DeleteTagService);

  tag = input.required<Tag>();
  onChanged = output<void>();

  protected delete() {
    this.deleteCategoryService
      .execute(this.tag())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.onChanged.emit());
  }
}
