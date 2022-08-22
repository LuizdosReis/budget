interface Status {
  name: string;
  order?: number;
  amount: number;
}

class Category {
  name: string;
  status: Status[];

  constructor({ name, status }: { name: string; status: Status[] }) {
    this.name = name;
    this.status = status;
  }

  get amount(): number {
    return this.status
      .map(status => status.amount)
      .reduce((previous, current) => previous + current, 0);
  }
}

export default class Account {
  name: string;
  currencyCode: string;
  deposits: Category[];
  withdrawals: Category[];
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
    deposits: { name: string; status: Status[] }[];
    withdrawals: { name: string; status: Status[] }[];
    name: string;
    currencyCode: string;
    currentBalance: number;
    expectedBalance: number;
    monthlyBalance: number;
  }) {
    this.deposits = deposits.map(deposit => new Category(deposit));
    this.withdrawals = withdrawals.map(withdrawal => new Category(withdrawal));
    this.name = name;
    this.currencyCode = currencyCode;
    this.currentBalance = currentBalance;
    this.expectedBalance = expectedBalance;
    this.monthlyBalance = monthlyBalance;
  }

  get totalDeposits(): number {
    return this.deposits
      .map(category => category.amount)
      .reduce((previous, current) => previous + current, 0);
  }

  totalDepositsBy(statusName: string): number {
    return this.deposits
      .map(category => category.status)
      .flatMap(status => status)
      .filter(status => status.name === statusName)
      .map(status => status.amount)
      .reduce((previous, current) => previous + current, 0);
  }

  get depositStatus(): string[] {
    return this.deposits
      .map(category => category.status)
      .flatMap(status => status)
      .sort((a, b) => {
        if (!a.order) {
          return 1;
        }

        if (!b.order) {
          return -1;
        }

        return a.order - b.order;
      })
      .map(status => status.name)
      .filter((status, index, array) => array.indexOf(status) === index);
  }

  get totalWithdrawals(): number {
    return this.withdrawals
      .map(transaction => transaction.amount)
      .reduce((previous, current) => previous + current, 0);
  }

  totalWithdrawalsBy(statusName: string): number {
    return this.withdrawals
      .map(category => category.status)
      .flatMap(status => status)
      .filter(status => status.name === statusName)
      .map(status => status.amount)
      .reduce((previous, current) => previous + current, 0);
  }

  get withdrawalStatus(): string[] {
    return this.withdrawals
      .map(category => category.status)
      .flatMap(status => status)
      .sort((a, b) => {
        if (!a.order) {
          return 1;
        }

        if (!b.order) {
          return -1;
        }

        return a.order - b.order;
      })
      .map(status => status.name)
      .filter((status, index, array) => array.indexOf(status) === index);
  }
}
