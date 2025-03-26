import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonDirective } from '@shared/directives/button.directive';
import { Category } from '../../models/category';
import { Type } from '../../models/type';
import { DeleteCategoryService } from '../../services/delete-category.service';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [NgClass, ButtonDirective],
  templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
  private destroyRef = inject(DestroyRef);
  private deleteCategoryService = inject(DeleteCategoryService);

  category = input.required<Category>();
  onChanged = output<void>();

  protected tagColor = computed(() => {
    return this.category().type === Type.INCOME
      ? 'bg-primary-500/10 text-primary-600'
      : 'bg-danger-500/10 text-danger-600';
  });
  protected typeName = computed(() => {
    return this.category().type === Type.INCOME ? 'Income' : 'Expense';
  });

  protected delete() {
    this.deleteCategoryService
      .execute(this.category())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.onChanged.emit());
  }
}
