import { Component, computed, input } from '@angular/core';
import { Category } from '../../models/Category';
import { Type } from '@app/categories/models/Type';
import { NgClass } from '@angular/common';
import { ButtonDirective } from '@shared/directives/button.directive';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [NgClass, ButtonDirective],
  templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
  category = input.required<Category>();
  tagColor = computed(() => {
    return this.category().type === Type.INCOME
      ? 'bg-primary-500/10 text-primary-600'
      : 'bg-danger-500/10 text-danger-600';
  });
  typeName = computed(() => {
    return this.category().type === Type.INCOME ? 'Income' : 'Expense';
  });
}
