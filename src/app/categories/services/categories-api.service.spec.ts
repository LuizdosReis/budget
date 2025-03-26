import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';

import { Category } from '../models/category';
import { CategoryRequest } from '../models/category-request';
import { Type } from '../models/type';
import { CategoriesApiService } from './categories-api.service';

describe('CategoriesApiService', () => {
  let spectator: SpectatorHttp<CategoriesApiService>;

  const createHttp = createHttpFactory(CategoriesApiService);

  beforeEach(() => (spectator = createHttp()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('getCategories should make a GET request with the correct URL', done => {
    const expectedCategories: Category[] = [
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

    spectator.service.getCategories().subscribe((categories: Category[]) => {
      expect(categories).toBe(expectedCategories);
      done();
    });

    const req = spectator.expectOne(spectator.service.URL, HttpMethod.GET);

    req.flush(expectedCategories);
  });

  it('should call delete with account id in the url', () => {
    const id = 'ecdfd059-c798-43f2-8daf-9e8692216632';
    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${spectator.service.URL}/${id}`, HttpMethod.DELETE);
  });

  it('post should make a POST call with category in the body', () => {
    const category: CategoryRequest = {
      name: 'Expense',
      type: Type.EXPENSE,
    };

    spectator.service.post(category).subscribe();
    const req = spectator.expectOne(spectator.service.URL, HttpMethod.POST);
    expect(req.request.body).toEqual(category);
  });
});
