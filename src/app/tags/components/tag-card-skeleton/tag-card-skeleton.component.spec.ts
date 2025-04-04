import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TagCardSkeletonComponent } from './tag-card-skeleton.component';

describe('TagCardSkeleton', () => {
  let spectator: Spectator<TagCardSkeletonComponent>;

  const createComponent = createComponentFactory<TagCardSkeletonComponent>(
    TagCardSkeletonComponent
  );

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
