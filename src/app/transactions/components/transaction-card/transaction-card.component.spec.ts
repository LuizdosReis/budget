import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { Transaction, TransactionStatus } from '../../models/transaction';
import { TransactionCardComponent } from './transaction-card.component';

describe('TransactionCardComponent', () => {
  let spectator: Spectator<TransactionCardComponent>;

  const createComponent = createComponentFactory<TransactionCardComponent>({
    component: TransactionCardComponent,
  });

  const transaction: Transaction = {
    id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
    description: 'description',
    status: TransactionStatus.REGISTERED,
    date: '2025-04-01',
    account: {
      id: 'b58855ea-f9de-442e-83d8-5f91fee548ff',
      name: 'account',
      currency: 'EUR',
    },
    tags: [
      {
        id: 'b58855ea-f9de-442e-83d8-5f91fee548ff',
        name: 'tag',
      },
    ],
    amount: 10,
    category: {
      id: '60e7f6bc-8051-494e-a4ae-57d91178cb16',
      name: 'category',
      type: 'INCOME',
    },
    deleted: false,
  };

  beforeEach(() => {
    spectator = createComponent({
      props: { transaction },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display transaction info', () => {
    expect(spectator.query(byTestId('description'))).toHaveText(
      transaction.description
    );
    expect(spectator.query(byTestId('account'))).toHaveText(
      transaction.account.name
    );
    expect(spectator.query(byTestId('amount'))).toHaveText(
      transaction.amount.toString()
    );
  });

  [
    { status: TransactionStatus.REGISTERED, description: 'Registrada' },
    { status: TransactionStatus.COMPLETED, description: 'Efetuada' },
    { status: TransactionStatus.SCHEDULED, description: 'Agendada' },
  ].forEach(
    ({
      status,
      description,
    }: {
      status: TransactionStatus;
      description: string;
    }) => {
      it(`should display description ${description} to status ${status}`, () => {
        spectator.setInput('transaction', { ...transaction, status });
        expect(spectator.query(byTestId('status'))).toHaveText(description);
      });
    }
  );

  [
    { currency: 'EUR', expectedText: '€10.00' },
    { currency: 'BRL', expectedText: 'R$10.00' },
  ].forEach(
    ({
      currency,
      expectedText,
    }: {
      currency: string;
      expectedText: string;
    }) => {
      it(`should display formatted amount with currency ${currency}`, () => {
        spectator.setInput('transaction', {
          ...transaction,
          account: { ...transaction.account, currency },
        });
        expect(spectator.query(byTestId('amount'))).toHaveText(expectedText);
      });
    }
  );
});
