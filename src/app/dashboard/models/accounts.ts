interface TransactionAmount {
  name: string;
  amount: number;
  status: string;
}

export default class Account {
  deposits: TransactionAmount[];
  withdrawals: TransactionAmount[];

  constructor({
    deposits,
    withdrawals,
  }: {
    deposits: TransactionAmount[];
    withdrawals: TransactionAmount[];
  }) {
    this.deposits = deposits;
    this.withdrawals = withdrawals;
  }

  get totalDeposits(): number {
    return this.deposits
      .map(transaction => transaction.amount)
      .reduce((previous, current) => previous + current, 0);
  }

  totalDepositsBy(status: string): number {
    return this.deposits
      .filter(transaction => transaction.status === status)
      .map(transaction => transaction.amount)
      .reduce((previous, current) => previous + current, 0);
  }

  get totalWithdrawals(): number {
    return this.withdrawals
      .map(transaction => transaction.amount)
      .reduce((previous, current) => previous + current, 0);
  }

  totalWithdrawalsBy(status: string): number {
    return this.withdrawals
      .filter(transaction => transaction.status === status)
      .map(transaction => transaction.amount)
      .reduce((previous, current) => previous + current, 0);
  }
}
