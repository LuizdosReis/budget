import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { Page } from '@shared/models/page';
import { Transaction, TransactionStatus, Type } from '../models/transaction';
import { TransactionsApiService } from './transactions-api.service';

describe('TransactionsApiService', () => {
  let spectator: SpectatorHttp<TransactionsApiService>;
  const createHttp = createHttpFactory(TransactionsApiService);

  const mockTransactionPage: Page<Transaction> = {
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
          type: Type.INCOME,
        },
        deleted: false,
      },
    ],
    totalElements: 1,
    totalPages: 1,
    last: true,
    size: 1,
    number: 0,
    numberOfElements: 1,
    first: true,
    empty: false,
  };

  beforeEach(() => (spectator = createHttp()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('getTransactions should make a GET request with the correct URL', () => {
    spectator.service
      .getTransactions({ page: 0 })
      .subscribe((transactionPage: Page<Transaction>) => {
        expect(transactionPage).toBe(mockTransactionPage);
      });

    const req = spectator.expectOne(
      `${spectator.service.URL}?nonDeleted=true&page=0`,
      HttpMethod.GET
    );

    req.flush(mockTransactionPage);
  });

  it('getTransactions should make a GET request with searchTerm param', () => {
    spectator.service
      .getTransactions({ page: 0, searchTerm: 'transaction' })
      .subscribe();

    const req = spectator.expectOne(
      `${spectator.service.URL}?nonDeleted=true&page=0&searchTerm=transaction`,
      HttpMethod.GET
    );

    req.flush(mockTransactionPage);
  });

  it('getTransactions should make a GET request without searchTerm param when searchTerm is empty', () => {
    spectator.service.getTransactions({ page: 0, searchTerm: '' }).subscribe();

    const req = spectator.expectOne(
      `${spectator.service.URL}?nonDeleted=true&page=0`,
      HttpMethod.GET
    );

    req.flush(mockTransactionPage);
  });
});
