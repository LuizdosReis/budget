import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class CategoriesComponent implements OnInit {
  private readonly categoriesApiService = inject(CategoriesApiService);
  private readonly addCategoryService = inject(AddCategoryService);
  private readonly destroyRef = inject(DestroyRef);

  protected categories: Category[] = [];
  protected categoriesLoaded = false;

  ngOnInit(): void {
    this.loadCategories();
  }

  protected loadCategories(): void {
    this.categoriesLoaded = false;
    this.categoriesApiService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categoriesLoaded = true;
      });
  }

  protected addAccount(): void {
    this.addCategoryService
      .execute()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadCategories());
  }
}
