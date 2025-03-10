import { CategoryCardComponent } from './category-card.component';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { Type } from '../../models/Type';
import { Category } from '../../models/Category';

describe('CategoryCardComponent', () => {
  let spectator: Spectator<CategoryCardComponent>;

  const createComponent = createComponentFactory<CategoryCardComponent>(
    CategoryCardComponent
  );

  const category: Category = {
    id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
    name: 'Expense',
    type: Type.EXPENSE,
  };

  beforeEach(() => {
    spectator = createComponent({
      props: { category },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display name and type', () => {
    expect(spectator.query(byTestId('name'))).toHaveText(category.name);
    expect(spectator.query(byTestId('type'))).toHaveText('Expense');
  });

  it('should display correct type', () => {
    spectator.setInput('category', {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
      name: 'Expense',
      type: Type.INCOME,
    });

    expect(spectator.query(byTestId('type'))).toHaveText('Income');
  });

  [
    { type: Type.INCOME, clazz: 'bg-primary-500/10 text-primary-600' },
    { type: Type.EXPENSE, clazz: 'bg-danger-500/10 text-danger-600' },
  ].forEach(({ type, clazz }) => {
    it(`should have ${clazz} when type is ${type}`, () => {
      spectator.setInput('category', {
        id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
        name: 'Expense',
        type: type,
      });

      expect(spectator.query(byTestId('tag'))).toHaveClass(clazz);
    });
  });
});
