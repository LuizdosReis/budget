import { CategoriesApiService } from './categories-api.service';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { Category } from '../models/Category';
import { Type } from '../models/Type';

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
});
