import { MatDialog } from '@angular/material/dialog';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { delay, Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { Type } from '../models/type';
import { CategoriesApiService } from './categories-api.service';
import { DeleteCategoryService } from './delete-category.service';

describe('DeleteCategoryService', () => {
  let spectator: SpectatorService<DeleteCategoryService>;

  const createService = createServiceFactory<DeleteCategoryService>({
    service: DeleteCategoryService,
    mocks: [MatDialog, CategoriesApiService],
  });
  const createDialogRef = (overrides?: { confirmed?: Observable<void> }) => ({
    componentInstance: {
      confirmed: of(),
      ...overrides,
    },
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call api service with category when dialog is confirmed', done => {
    const category: Category = {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
      name: 'Expense',
      type: Type.EXPENSE,
    };
    const dialogRef = createDialogRef({
      confirmed: of(undefined).pipe(delay(500)),
    });
    spectator.inject(MatDialog).open.andReturn(dialogRef);
    const categoriesApiService = spectator.inject(CategoriesApiService);
    categoriesApiService.delete.and.returnValue(of(undefined));

    spectator.service.execute(category).subscribe(() => {
      expect(categoriesApiService.delete).toHaveBeenCalledWith(category.id);
      done();
    });
  });
});
