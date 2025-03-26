import { MatDialog } from '@angular/material/dialog';
import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator';
import { delay, of } from 'rxjs';
import { Category } from '../models/category';
import { Type } from '../models/type';
import { CategoriesApiService } from './categories-api.service';
import { EditCategoryService } from './edit-category.service';

describe('EditCategoryService', () => {
  let spectator: SpectatorService<EditCategoryService>;
  let categoriesApiService: SpyObject<CategoriesApiService>;

  const category: Category = {
    id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
    name: 'Expense',
    type: Type.EXPENSE,
  };

  const createService = createServiceFactory({
    service: EditCategoryService,
    mocks: [CategoriesApiService, MatDialog],
  });

  beforeEach(() => {
    spectator = createService();
    categoriesApiService = spectator.inject(CategoriesApiService);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call categoriesApiService put with form data and dialogRef close when form is submitted', done => {
    const form = {
      name: category.name,
      type: category.type,
    };

    const dialogRef = {
      componentInstance: {
        onSubmit: of(form).pipe(delay(500)),
      },
      close: jasmine.createSpy('close'),
    };

    spectator.inject(MatDialog).open.andReturn(dialogRef);
    categoriesApiService.put.and.returnValue(of({}));
    spectator.service.execute(category).subscribe(() => {
      expect(categoriesApiService.put).toHaveBeenCalledWith(category.id, form);
      expect(dialogRef.close).toHaveBeenCalled();
      done();
    });
  });
});
