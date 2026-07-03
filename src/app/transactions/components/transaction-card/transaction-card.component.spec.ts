import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { Transaction, TransactionStatus, Type } from '../../models/transaction';
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
      {
        id: 'b58855ea-f9de-442e-83d8-5f91fee548fs',
        name: 'tag 2',
      },
    ],
    amount: 10,
    category: {
      id: '60e7f6bc-8051-494e-a4ae-57d91178cb16',
      name: 'category',
      type: Type.EXPENSE,
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

  it('should display transaction description', () => {
    expect(spectator.query(byTestId('description'))).toHaveText(
      transaction.description
    );
  });

  it('should display account name', () => {
    expect(spectator.query(byTestId('account'))).toHaveText(
      transaction.account.name
    );
  });

  it('should display tag names', () => {
    const tags = spectator.queryAll(byTestId('tag'));

    expect(tags.length).toBe(2);

    expect(tags[0]).toHaveText('tag');
    expect(tags[1]).toHaveText('tag 2');
  });

  it('should display the tag separator when transaction has tags', () => {
    expect(spectator.query(byTestId('tag-separator'))).toExist();
  });

  it('should not display the tag separator when transaction has no tags', () => {
    spectator.setInput('transaction', {
      ...transaction,
      tags: [],
    });

    expect(spectator.query(byTestId('tag-separator'))).not.toExist();
  });

  it('should display the formatted date correctly', () => {
    expect(spectator.query(byTestId('date'))).toHaveText('Mov. Tue, 1 de Apr');
  });

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

  it('should have text-success-700 class when category type is income ', () => {
    spectator.setInput('transaction', {
      ...transaction,
      category: { ...transaction.category, type: Type.INCOME },
    });

    expect(spectator.query(byTestId('amount'))).toHaveClass('text-success-700');
  });

  it('should not have text-success-700 class when category type is not income ', () => {
    spectator.setInput('transaction', {
      ...transaction,
      category: { ...transaction.category, type: Type.EXPENSE },
    });

    expect(spectator.query(byTestId('amount'))).not.toHaveClass(
      'text-success-700'
    );
  });

  [
    {
      type: Type.INCOME,
      expectedSign: '+',
    },
    {
      type: Type.EXPENSE,
      expectedSign: '-',
    },
  ].forEach(({ type, expectedSign }: { type: Type; expectedSign: string }) => {
    it(`should display a ${expectedSign} sign when the category type is an ${type}`, () => {
      spectator.setInput('transaction', {
        ...transaction,
        category: { ...transaction.category, type },
      });

      expect(spectator.query(byTestId('amount'))).toHaveText(
        `${expectedSign}€10.00`
      );
    });
  });

  [
    {
      status: TransactionStatus.REGISTERED,
      type: Type.INCOME,
      label: 'registrado',
      icon: 'fa-clock-rotate-left fa-solid',
      classes: 'bg-warning-50 border-warning-100 text-warning-700',
    },
    {
      status: TransactionStatus.COMPLETED,
      type: Type.INCOME,
      label: 'recebido',
      icon: 'fa-solid fa-check',
      classes: 'bg-success-50 border-success-100 text-success-700',
    },
    {
      status: TransactionStatus.COMPLETED,
      type: Type.EXPENSE,
      label: 'pago',
      icon: 'fa-solid fa-check-double',
      classes: 'bg-danger-50 border-danger-100 text-danger-700',
    },
    {
      status: TransactionStatus.SCHEDULED,
      type: Type.EXPENSE,
      label: 'agendado',
      icon: 'fa-solid fa-calendar-days',
      classes: 'bg-info-50 border-info-100 text-info-700',
    },
  ].forEach(
    ({
      status,
      label,
      type,
      icon,
      classes,
    }: {
      status: TransactionStatus;
      label: string;
      type: Type;
      icon: string;
      classes: string;
    }) => {
      it(`should display description ${label} with classes ${classes} and ${icon} to status ${status} with category type ${type}`, () => {
        spectator.setInput('transaction', {
          ...transaction,
          status,
          category: { ...transaction.category, type },
        });
        expect(spectator.query(byTestId('status'))).toHaveText(label);
        expect(spectator.query(byTestId('status'))).toHaveClass(classes);
        expect(spectator.query('[data-testid="status"] i')).toHaveClass(icon);
      });
    }
  );
});
