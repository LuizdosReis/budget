import { fakeAsync, tick } from '@angular/core/testing';
import {
  byTestId,
  createComponentFactory,
  Spectator,
  SpyObject,
} from '@ngneat/spectator';
import { delay, of } from 'rxjs';
import { Page } from '@shared/models/page';
import { Transaction, TransactionStatus } from '../../models/transaction';
import { TransactionsApiService } from '../../services/transactions-api.service';
import { TransactionsComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let spectator: Spectator<TransactionsComponent>;
  let transactionsApiService: SpyObject<TransactionsApiService>;

  const transactionPage: Page<Transaction> = {
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

  const createComponent = createComponentFactory<TransactionsComponent>({
    component: TransactionsComponent,
    providers: [],
    mocks: [TransactionsApiService],
    shallow: true,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    transactionsApiService = spectator.inject(TransactionsApiService);
    transactionsApiService.getTransactions.and.returnValue(of(transactionPage));
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have skeleton when starts', fakeAsync(() => {
    transactionsApiService.getTransactions.and.returnValue(
      of(transactionPage).pipe(delay(1))
    );
    spectator.detectChanges();
    expect(
      spectator.query(byTestId('transaction-card-skeleton'))
    ).toBeVisible();
    tick(1);
    spectator.detectChanges();
    expect(
      spectator.query(byTestId('transaction-card-skeleton'))
    ).not.toBeVisible();
  }));

  it('should have transactions cards for each category returned by getTransactions', () => {
    spectator.detectChanges();
    expect(spectator.queryAll(byTestId('transaction-card')).length).toBe(
      transactionPage.numberOfElements
    );
  });
});
