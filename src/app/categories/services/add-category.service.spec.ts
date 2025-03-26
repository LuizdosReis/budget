import { MatDialog } from '@angular/material/dialog';
import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator';
import { delay, of } from 'rxjs';
import { AddCategoryService } from './add-category.service';
import { CategoriesApiService } from './categories-api.service';

describe('AddCategoryService', () => {
  let spectator: SpectatorService<AddCategoryService>;
  let categoriesApiService: SpyObject<CategoriesApiService>;

  const createService = createServiceFactory({
    service: AddCategoryService,
    mocks: [CategoriesApiService, MatDialog],
  });

  beforeEach(() => {
    spectator = createService();
    categoriesApiService = spectator.inject(CategoriesApiService);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call categoriesApiService.post with form data when form is submitted', done => {
    const form = {};
    const dialogRef = {
      componentInstance: {
        onSubmit: of(form).pipe(delay(500)),
      },
      close: jasmine.createSpy('close'),
    };

    spectator.inject(MatDialog).open.andReturn(dialogRef);
    categoriesApiService.post.and.returnValue(of({}));
    spectator.service.execute().subscribe(() => {
      expect(categoriesApiService.post).toHaveBeenCalledWith(form);
      expect(dialogRef.close).toHaveBeenCalled();
      done();
    });
  });
});
