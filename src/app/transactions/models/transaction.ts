export enum TransactionStatus {
  REGISTERED = 'REGISTERED',
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
}

interface Account {
  id: string;
  name: string;
  currency: string;
}

interface Category {
  id: string;
  name: string;
  type: string;
}

interface Tag {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  deleted: boolean;
  account: Account;
  category: Category;
  tags: Tag[];
}
