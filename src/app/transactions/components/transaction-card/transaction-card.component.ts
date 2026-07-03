import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, ElementRef, input } from '@angular/core';
import { Transaction, TransactionStatus, Type } from '../../models/transaction';

export interface Status {
  label: string;
  classes: string;
  icon: string;
}

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './transaction-card.component.html',
})
export class TransactionCardComponent {
  transaction = input.required<Transaction>();

  protected isExpense = computed(
    () => this.transaction().category.type === Type.EXPENSE
  );

  protected isIncome = computed(
    () => this.transaction().category.type === Type.INCOME
  );

  protected status = computed<Status>(() => {
    if (this.transaction().status === TransactionStatus.SCHEDULED) {
      return {
        label: 'agendado',
        classes: 'bg-info-50 text-info-700 border-info-100',
        icon: 'fa-solid fa-calendar-days',
      };
    }

    if (this.transaction().status === TransactionStatus.REGISTERED) {
      return {
        label: 'registrado',
        classes: 'bg-warning-50 text-warning-700 border-warning-100',
        icon: 'fa-solid fa-clock-rotate-left',
      };
    }

    if (
      this.transaction().status === TransactionStatus.COMPLETED &&
      this.isExpense()
    ) {
      return {
        label: 'pago',
        classes: 'bg-danger-50 text-danger-700 border-danger-100',
        icon: 'fa-solid fa-check-double',
      };
    }

    return {
      label: 'recebido',
      classes: 'bg-success-50 text-success-700 border-success-100',
      icon: 'fa-solid fa-check',
    };
  });

  constructor(public elementRef: ElementRef) {}
}
