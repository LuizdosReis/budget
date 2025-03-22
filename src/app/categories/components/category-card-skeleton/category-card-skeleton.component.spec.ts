import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CategoryCardSkeletonComponent } from '../category-card-skeleton/category-card-skeleton.component';

describe('CategoryCardSkeleton', () => {
  let spectator: Spectator<CategoryCardSkeletonComponent>;

  const createComponent = createComponentFactory<CategoryCardSkeletonComponent>(
    CategoryCardSkeletonComponent
  );

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
