import Account from './accounts';

describe('Accounts', () => {
  let account: Account;

  beforeEach(() => {
    account = new Account({
      name: 'Nubank',
      currencyCode: 'BRL',
      currentBalance: 5,
      expectedBalance: 20,
      monthlyBalance: 2,
      deposits: [
        {
          name: 'Income',
          status: [
            {
              name: 'Received',
              amount: 100,
              order: 1,
            },
            {
              name: 'Scheduled',
              amount: 50,
              order: 2,
            },
            {
              name: '',
              amount: 50.5,
            },
          ],
        },
        {
          name: 'Redeemed',
          status: [
            {
              name: 'Received',
              amount: 100,
              order: 1,
            },
            {
              name: 'Scheduled',
              amount: 20,
              order: 2,
            },
          ],
        },
      ],
      withdrawals: [
        {
          name: 'Expense',
          status: [
            {
              name: 'Paid',
              amount: 100,
              order: 1,
            },
            {
              name: '',
              amount: 100,
            },
            {
              name: 'Scheduled',
              amount: 100,
              order: 2,
            },
          ],
        },

        {
          name: 'Transfer',
          status: [
            {
              name: 'Paid',
              amount: 20,
              order: 1,
            },
            {
              name: '',
              amount: 5,
            },
          ],
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

  it('depositStatus should return array of status', () => {
    expect(account.depositStatus).toEqual(['Received', 'Scheduled', '']);
  });

  it('totalDepositsBy status empty should return the total 50.5', () => {
    expect(account.totalDepositsBy('')).toBe(50.5);
  });

  it('totalWithdrawals should return the total of withdrawals', () => {
    expect(account.totalWithdrawals).toBe(325);
  });

  it('totalWithdrawals By status Paid should return the total 120', () => {
    expect(account.totalWithdrawalsBy('Paid')).toBe(120);
  });

  it('totalWithdrawals By status Scheduled should return the total 70', () => {
    expect(account.totalWithdrawalsBy('Scheduled')).toBe(100);
  });

  it('totalWithdrawals By status empty should return the total 105', () => {
    expect(account.totalWithdrawalsBy('')).toBe(105);
  });

  it('withdrawalStatus should return array of status', () => {
    expect(account.withdrawalStatus).toEqual(['Paid', 'Scheduled', '']);
  });
});
