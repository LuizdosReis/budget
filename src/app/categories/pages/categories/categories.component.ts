import { Component, inject, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UnsubComponent } from '@shared/components/unsub.component';
import { ButtonDirective } from '@shared/directives/button.directive';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { CategoryCardSkeletonComponent } from '../../components/category-card-skeleton/category-card-skeleton.component';
import { Category } from '../../models/category';
import { AddCategoryService } from '../../services/add-category.service';
import { CategoriesApiService } from '../../services/categories-api.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    ButtonDirective,
    CategoryCardSkeletonComponent,
    CategoryCardComponent,
  ],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent extends UnsubComponent implements OnInit {
  private readonly categoriesApiService = inject(CategoriesApiService);
  private readonly addCategoryService = inject(AddCategoryService);

  protected categories: Category[] = [];
  protected categoriesLoaded = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  protected loadAccounts(): void {
    this.categoriesLoaded = false;
    this.categoriesApiService
      .getCategories()
      .pipe(takeUntil(this.notifier))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categoriesLoaded = true;
      });
  }

  protected addAccount(): void {
    this.addCategoryService
      .execute()
      .pipe(takeUntil(this.notifier))
      .subscribe(() => this.loadAccounts());
  }
}
