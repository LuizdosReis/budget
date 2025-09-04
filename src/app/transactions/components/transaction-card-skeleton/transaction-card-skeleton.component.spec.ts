import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TransactionCardSkeletonComponent } from './transaction-card-skeleton.component';

describe('CategoryCardSkeleton', () => {
  let spectator: Spectator<TransactionCardSkeletonComponent>;

  const createComponent =
    createComponentFactory<TransactionCardSkeletonComponent>(
      TransactionCardSkeletonComponent
    );

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
