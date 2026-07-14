import { fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import {
  byTestId,
  createComponentFactory,
  Spectator,
  SpyObject,
} from '@ngneat/spectator';
import { BehaviorSubject, delay, of, throwError } from 'rxjs';
import { Page } from '@shared/models/page';
import { Transaction, TransactionStatus, Type } from '../../models/transaction';
import { TransactionsApiService } from '../../services/transactions-api.service';
import { TransactionsComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let spectator: Spectator<TransactionsComponent>;
  let transactionsApiService: SpyObject<TransactionsApiService>;
  let router: SpyObject<Router>;
  let queryParamsSubject: BehaviorSubject<Record<string, string>>;

  const createTransaction = (
    overrides: Partial<Transaction> = {}
  ): Transaction => ({
    id: crypto.randomUUID(),
    description: 'description',
    status: TransactionStatus.REGISTERED,
    date: '2025-04-01',
    account: {
      id: 'b58855ea-f9de-442e-83d8-5f91fee548ff',
      name: 'account',
      currency: 'EUR',
    },
    tags: [{ id: 'b58855ea-f9de-442e-83d8-5f91fee548ff', name: 'tag' }],
    amount: 10,
    category: {
      id: '60e7f6bc-8051-494e-a4ae-57d91178cb16',
      name: 'category',
      type: Type.INCOME,
    },
    deleted: false,
    ...overrides,
  });

  const createTransactionPage = (
    overrides?: Partial<Page<Transaction>>
  ): Page<Transaction> => {
    return {
      content: Array.from({ length: 10 }, () => createTransaction()),
      totalElements: 10,
      totalPages: 1,
      last: false,
      size: 2,
      number: 0,
      numberOfElements: 10,
      first: true,
      empty: false,
      ...overrides,
    };
  };

  const createComponent = createComponentFactory<TransactionsComponent>({
    component: TransactionsComponent,
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          get queryParams() {
            return queryParamsSubject;
          },
        },
      },
    ],
    mocks: [TransactionsApiService, Router],
    shallow: true,
    detectChanges: false,
  });

  beforeEach(() => {
    queryParamsSubject = new BehaviorSubject({});
    spectator = createComponent();
    transactionsApiService = spectator.inject(TransactionsApiService);
    router = spectator.inject(Router);
    transactionsApiService.getTransactions.and.returnValue(
      of(createTransactionPage())
    );
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should show skeleton cards while transactions are loading', fakeAsync(() => {
    transactionsApiService.getTransactions.and.returnValue(
      of(createTransactionPage()).pipe(delay(1))
    );
    spectator.detectChanges();
    expect(
      spectator.query(byTestId('transaction-card-skeleton'))
    ).toBeVisible();
    tick(1);
  }));

  it('should hide skeleton cards once transactions are loaded', () => {
    spectator.detectChanges();
    spectator.detectChanges();

    expect(
      spectator.queryAll(byTestId('transaction-card-skeleton')).length
    ).toBe(0);
  });

  it('should stop loading even when the request fails', () => {
    transactionsApiService.getTransactions.and.returnValue(
      throwError(() => new Error('error'))
    );

    spectator.detectChanges();
    spectator.detectChanges();

    expect(
      spectator.queryAll(byTestId('transaction-card-skeleton')).length
    ).toBe(0);
  });

  it('should show the "see more" button when lastPage is false', () => {
    transactionsApiService.getTransactions.and.returnValue(
      of(createTransactionPage({ last: false }))
    );

    spectator.detectChanges();
    spectator.detectChanges();

    expect(spectator.query(byTestId('see-more'))).toExist();
  });

  it('should not show the "see more" button when lastPage is true', () => {
    transactionsApiService.getTransactions.and.returnValue(
      of(createTransactionPage({ last: true }))
    );

    spectator.detectChanges();
    spectator.detectChanges();

    expect(spectator.query(byTestId('see-more'))).not.toExist();
  });

  it('should have transactions cards for each transactions returned by getTransactions', () => {
    spectator.detectChanges();
    spectator.detectChanges();

    expect(spectator.queryAll(byTestId('transaction-card')).length).toBe(10);
  });

  it('should load the next page and append transactions when "see more" is clicked', () => {
    spectator.detectChanges();
    spectator.detectChanges();

    transactionsApiService.getTransactions.and.returnValue(
      of(createTransactionPage({ content: [createTransaction()] }))
    );

    spectator.click(byTestId('see-more'));

    expect(transactionsApiService.getTransactions).toHaveBeenCalledWith({
      searchTerm: '',
      page: 1,
    });

    const cards = spectator.queryAll('[data-testid="transaction-card"]');
    expect(cards.length).toBe(11);
  });

  it('should reset page and transactions, then navigate with the search term', () => {
    spectator.detectChanges();

    spectator.triggerEventHandler('app-search-input', 'searchChange', 'coffee');

    expect(router.navigate).toHaveBeenCalledWith([], {
      relativeTo: jasmine.anything(),
      queryParams: { searchTerm: 'coffee' },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  });

  it('should navigate with searchTerm as null when the search is cleared', () => {
    spectator.detectChanges();

    spectator.triggerEventHandler('app-search-input', 'searchChange', '');

    expect(router.navigate).toHaveBeenCalledWith([], {
      relativeTo: jasmine.anything(),
      queryParams: { searchTerm: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  });

  it('should reload transactions when the searchTerm query param changes', () => {
    queryParamsSubject.next({ searchTerm: 'pizza' });
    spectator.detectChanges();

    expect(transactionsApiService.getTransactions).toHaveBeenCalledWith({
      searchTerm: 'pizza',
      page: 0,
    });
  });
});
