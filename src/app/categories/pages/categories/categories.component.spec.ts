import { CategoriesComponent } from './categories.component';
import {
  byTestId,
  createComponentFactory,
  Spectator,
  SpyObject,
} from '@ngneat/spectator';
import { CategoriesApiService } from '../../services/categories-api.service';
import { delay, of } from 'rxjs';
import { Category } from '../../models/Category';
import { Type } from '@app/categories/models/Type';
import { fakeAsync, tick } from '@angular/core/testing';

describe('CategoriesComponent', () => {
  let spectator: Spectator<CategoriesComponent>;
  let categoriesApiService: SpyObject<CategoriesApiService>;

  const categories: Category[] = [
    {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
      name: 'Expense',
      type: Type.EXPENSE,
    },
    {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216633',
      name: 'Income',
      type: Type.INCOME,
    },
  ];

  const createComponent = createComponentFactory<CategoriesComponent>({
    component: CategoriesComponent,
    providers: [],
    mocks: [CategoriesApiService],
    shallow: true,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    categoriesApiService = spectator.inject(CategoriesApiService);
    categoriesApiService.getCategories.and.returnValue(of(categories));
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have skeleton when starts', fakeAsync(() => {
    categoriesApiService.getCategories.and.returnValue(
      of(categories).pipe(delay(1))
    );
    spectator.detectChanges();
    expect(spectator.query(byTestId('category-card-skeleton'))).toBeVisible();
    tick(1);
    spectator.detectChanges();
    expect(
      spectator.query(byTestId('category-card-skeleton'))
    ).not.toBeVisible();
  }));

  it('should have category cards for each category returned by getCategories', () => {
    spectator.detectChanges();
    expect(spectator.queryAll(byTestId('category-card')).length).toBe(
      categories.length
    );
  });
});
