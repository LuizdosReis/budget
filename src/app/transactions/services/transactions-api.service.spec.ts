import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { Page } from '@shared/models/page';
import { Transaction, TransactionStatus } from '../models/transaction';
import { TransactionsApiService } from './transactions-api.service';

describe('TransactionsApiService', () => {
  let spectator: SpectatorHttp<TransactionsApiService>;

  const createHttp = createHttpFactory(TransactionsApiService);

  beforeEach(() => (spectator = createHttp()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('getTransactions should make a GET request with the correct URL', done => {
    const expectedTransactionPage: Page<Transaction> = {
      content: [
        {
          id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
          description: 'description',
          status: TransactionStatus.REGISTERED,
          date: '2025-04-01',
          account: {
            id: 'b58855ea-f9de-442e-83d8-5f91fee548ff',
            name: 'account',
            currency: 'EUR',
          },
          tags: [
            {
              id: 'b58855ea-f9de-442e-83d8-5f91fee548ff',
              name: 'tag',
            },
          ],
          amount: 10,
          category: {
            id: '60e7f6bc-8051-494e-a4ae-57d91178cb16',
            name: 'category',
            type: 'INCOME',
          },
          deleted: false,
        },
        {
          id: 'ecdfd059-c798-43f2-8daf-9e8692216631',
          description: 'description 2',
          status: TransactionStatus.REGISTERED,
          date: '2025-04-01',
          account: {
            id: 'b58855ea-f9de-442e-83d8-5f91fee548ff',
            name: 'account',
            currency: 'EUR',
          },
          tags: [
            {
              id: 'b58855ea-f9de-442e-83d8-5f91fee548ff',
              name: 'tag',
            },
          ],
          amount: 10,
          category: {
            id: '60e7f6bc-8051-494e-a4ae-57d91178cb16',
            name: 'category',
            type: 'INCOME',
          },
          deleted: false,
        },
      ],
      totalElements: 2,
      totalPages: 1,
      last: true,
      size: 2,
      number: 0,
      numberOfElements: 2,
      first: true,
      empty: false,
    };

    spectator.service
      .getTransactions()
      .subscribe((transactionPage: Page<Transaction>) => {
        expect(transactionPage).toBe(expectedTransactionPage);
        done();
      });

    const req = spectator.expectOne(
      `${spectator.service.URL}?nonDeleted=true`,
      HttpMethod.GET
    );

    req.flush(expectedTransactionPage);
  });
});
