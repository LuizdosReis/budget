interface TransactionAmount {
  name: string;
  amount: number;
  status: string;
  order?: number;
}

export default class Account {
  name: string;
  currencyCode: string;
  deposits: TransactionAmount[];
  withdrawals: TransactionAmount[];
  currentBalance: number;
  expectedBalance: number;
  monthlyBalance: number;

  constructor({
    deposits,
    withdrawals,
    name,
    currencyCode,
    currentBalance,
    expectedBalance,
    monthlyBalance,
  }: {
    deposits: TransactionAmount[];
    withdrawals: TransactionAmount[];
    name: string;
    currencyCode: string;
    currentBalance: number;
    expectedBalance: number;
    monthlyBalance: number;
  }) {
    this.deposits = deposits;
    this.withdrawals = withdrawals;
    this.name = name;
    this.currencyCode = currencyCode;
    this.currentBalance = currentBalance;
    this.expectedBalance = expectedBalance;
    this.monthlyBalance = monthlyBalance;
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

  get depositStatus(): string[] {
    return this.deposits
      .map(transaction => transaction.status)
      .filter((status, index, array) => array.indexOf(status) === index);
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

  get withdrawalStatus(): string[] {
    return this.withdrawals
      .sort((a, b) => {
        if (!a.order) {
          return 1;
        }

        if (!b.order) {
          return -1;
        }

        return a.order - b.order;
      })
      .map(transaction => transaction.status)
      .filter((status, index, array) => array.indexOf(status) === index);
  }
}
