import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';
import { Tag } from '../../models/tag';
import { DeleteTagService } from '../../services/delete-tag.service';
import { TagCardComponent } from './tag-card.component';

describe('TagCardComponent', () => {
  let spectator: Spectator<TagCardComponent>;

  const createComponent = createComponentFactory<TagCardComponent>({
    component: TagCardComponent,
    mocks: [DeleteTagService],
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

  it('should call delete service when delete button is clicked', () => {
    const deleteTagService = spectator.inject(DeleteTagService);
    spectator.click(byTestId('delete-button'));
    expect(deleteTagService.execute).toHaveBeenCalledWith(tag);
  });

  it('should emit onChanged event when delete tag is executed ', () => {
    const deleteTagService = spectator.inject(DeleteTagService);
    const spy = spyOn(spectator.component.onChanged, 'emit');
    deleteTagService.execute.and.returnValue(of({}));
    spectator.click(byTestId('delete-button'));
    expect(spy).toHaveBeenCalled();
  });
});
