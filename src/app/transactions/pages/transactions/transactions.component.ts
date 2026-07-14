import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { SearchInputComponent } from '@shared/components/search-input/search-input.component';
import { ButtonDirective } from '@shared/directives/button.directive';
import { Page } from '@shared/models/page';
import { TransactionCardComponent } from '../../components/transaction-card/transaction-card.component';
import { TransactionCardSkeletonComponent } from '../../components/transaction-card-skeleton/transaction-card-skeleton.component';
import { Transaction } from '../../models/transaction';
import { TransactionsApiService } from '../../services/transactions-api.service';

interface FilterState {
  searchTerm: string;
  page: number;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    ButtonDirective,
    TransactionCardComponent,
    TransactionCardSkeletonComponent,
    SearchInputComponent,
  ],
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent {
  private readonly transactionsApiService = inject(TransactionsApiService);
  private readonly destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected transactions: Transaction[] = [];
  protected transactionsLoaded = false;
  protected lastPage = signal<boolean>(true);
  protected page = signal<number>(0);
  protected params = toSignal(
    this.route.queryParams.pipe(
      map(params => ({
        searchTerm: params['searchTerm'] || '',
      }))
    ),
    { initialValue: { searchTerm: '' } }
  );

  protected filters = computed<FilterState>(() => ({
    searchTerm: this.params().searchTerm,
    page: this.page(),
  }));

  constructor() {
    toObservable(this.filters)
      .pipe(
        takeUntilDestroyed(),
        tap(() => (this.transactionsLoaded = false)),
        switchMap(filters =>
          this.transactionsApiService.getTransactions({
            searchTerm: filters?.searchTerm,
            page: filters?.page,
          })
        )
      )
      .subscribe({
        next: (transactionPage: Page<Transaction>) => {
          this.transactions = [
            ...this.transactions,
            ...transactionPage.content,
          ];
          this.lastPage.set(transactionPage.last);
          this.transactionsLoaded = true;
        },
        error: () => {
          this.transactionsLoaded = true;
        },
      });
  }

  protected onSearchTransaction(searchTerm: string) {
    this.page.set(0);
    this.transactions = [];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { searchTerm: searchTerm || null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  protected onSeeMore(): void {
    this.page.update(p => p + 1);
  }
}
