import Account from './accounts';

describe('Accounts', () => {
  let account: Account;

  beforeEach(() => {
    account = new Account({
      deposits: [
        {
          name: 'Income',
          status: 'Received',
          amount: 100,
        },
        {
          name: 'Income',
          status: 'Scheduled',
          amount: 50,
        },
        {
          name: 'Income',
          status: '',
          amount: 50.5,
        },
        {
          name: 'Redeemed',
          status: 'Received',
          amount: 100,
        },
        {
          name: 'Redeemed',
          status: 'Scheduled',
          amount: 20,
        },
      ],
      withdrawals: [
        {
          name: 'Expense',
          status: 'Received',
          amount: 100,
        },
        {
          name: 'Expense',
          status: '',
          amount: 100,
        },
        {
          name: 'Expense',
          status: 'Scheduled',
          amount: 100,
        },
      ],
    });
  });

  it('should create an account', () => {
    expect(account).toBeTruthy();
  });

  it('totalDeposits should return the total of deposits', () => {
    expect(account.totalDeposits).toBe(320.5);
  });

  it('totalDepositsBy status Received should return the total 200', () => {
    expect(account.totalDepositsBy('Received')).toBe(200);
  });

  it('totalDepositsBy status Scheduled should return the total 70', () => {
    expect(account.totalDepositsBy('Scheduled')).toBe(70);
  });

  it('totalDepositsBy status empty should return the total 50.5', () => {
    expect(account.totalDepositsBy('')).toBe(50.5);
  });

  it('totalWithdrawals should return the total of withdrawals', () => {
    expect(account.totalWithdrawals).toBe(300);
  });

  it('totalWithdrawals By status Received should return the total 200', () => {
    expect(account.totalWithdrawalsBy('Received')).toBe(100);
  });

  it('totalWithdrawals By status Scheduled should return the total 70', () => {
    expect(account.totalWithdrawalsBy('Scheduled')).toBe(100);
  });

  it('totalWithdrawals By status empty should return the total 100', () => {
    expect(account.totalWithdrawalsBy('')).toBe(100);
  });
});
