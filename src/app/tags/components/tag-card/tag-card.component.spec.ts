import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { Tag } from '../../models/tag';
import { TagCardComponent } from './tag-card.component';

describe('TagCardComponent', () => {
  let spectator: Spectator<TagCardComponent>;

  const createComponent = createComponentFactory<TagCardComponent>({
    component: TagCardComponent,
    mocks: [],
  });

  const tag: Tag = {
    id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
    name: 'Tag',
  };

  beforeEach(() => {
    spectator = createComponent({
      props: { tag },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display name', () => {
    expect(spectator.query(byTestId('name'))).toHaveText(tag.name);
  });
});
