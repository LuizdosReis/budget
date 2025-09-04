import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Transaction, TransactionStatus } from '../../models/transaction';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './transaction-card.component.html',
})
export class TransactionCardComponent {
  transaction = input.required<Transaction>();

  protected statusDescription = computed(() => {
    const transactionStatusDescription = {
      [TransactionStatus.COMPLETED]: 'Efetuada',
      [TransactionStatus.SCHEDULED]: 'Agendada',
      [TransactionStatus.REGISTERED]: 'Registrada',
    };
    return transactionStatusDescription[this.transaction().status];
  });
}
