import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonDirective } from '@shared/directives/button.directive';
import { Page } from '@shared/models/page';
import { TransactionCardComponent } from '../../components/transaction-card/transaction-card.component';
import { TransactionCardSkeletonComponent } from '../../components/transaction-card-skeleton/transaction-card-skeleton.component';
import { Transaction } from '../../models/transaction';
import { TransactionsApiService } from '../../services/transactions-api.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    ButtonDirective,
    TransactionCardComponent,
    TransactionCardSkeletonComponent,
  ],
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
  private readonly transactionsApiService = inject(TransactionsApiService);
  private readonly destroyRef = inject(DestroyRef);

  protected transactions: Transaction[] = [];
  protected transactionsLoaded = false;

  ngOnInit(): void {
    this.loadTags();
  }

  private loadTags(): void {
    this.transactionsLoaded = false;
    this.transactionsApiService
      .getTransactions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((transactionPage: Page<Transaction>) => {
        this.transactions = transactionPage.content;
        this.transactionsLoaded = true;
      });
  }
}
