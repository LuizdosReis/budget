import { Component, OnInit } from '@angular/core';
import { ButtonDirective } from '@shared/directives/button.directive';
import { UnsubComponent } from '@shared/components/unsub.component';
import { takeUntil } from 'rxjs';
import { Category } from '../../models/Category';
import { CategoriesApiService } from '../../services/categories-api.service';
import { CategoryCardSkeletonComponent } from '../../components/category-card-skeleton/category-card-skeleton.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';

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
  categories: Category[] = [];
  categoriesLoaded = false;

  constructor(private categoriesApiService: CategoriesApiService) {
    super();
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.categoriesLoaded = false;
    this.categoriesApiService
      .getCategories()
      .pipe(takeUntil(this.notifier))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categoriesLoaded = true;
      });
  }
}
