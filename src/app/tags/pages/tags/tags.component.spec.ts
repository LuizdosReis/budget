import { fakeAsync, tick } from '@angular/core/testing';

import {
  byTestId,
  createComponentFactory,
  Spectator,
  SpyObject,
} from '@ngneat/spectator';
import { delay, of } from 'rxjs';
import { Tag } from '../../models/tag';
import { AddTagService } from '../../services/add-tag.service';
import { TagsApiService } from '../../services/tags-api.service';
import { TagsComponent } from './tags.component';

describe('TagsComponent', () => {
  let spectator: Spectator<TagsComponent>;
  let tagsApiService: SpyObject<TagsApiService>;
  let addTagService: SpyObject<AddTagService>;

  const tags: Tag[] = [
    {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
      name: 'tag1',
    },
    {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216633',
      name: 'tag2',
    },
  ];

  const createComponent = createComponentFactory<TagsComponent>({
    component: TagsComponent,
    providers: [],
    mocks: [TagsApiService, AddTagService],
    shallow: true,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    tagsApiService = spectator.inject(TagsApiService);
    addTagService = spectator.inject(AddTagService);
    tagsApiService.getTags.and.returnValue(of(tags));
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have skeleton when starts', fakeAsync(() => {
    tagsApiService.getTags.and.returnValue(of(tags).pipe(delay(1)));
    spectator.detectChanges();
    expect(spectator.query(byTestId('tag-card-skeleton'))).toBeVisible();
    tick(1);
    spectator.detectChanges();
    expect(spectator.query(byTestId('tag-card-skeleton'))).not.toBeVisible();
  }));

  it('should have tag cards for each tag returned by getTags', () => {
    spectator.detectChanges();
    expect(spectator.queryAll(byTestId('tag-card')).length).toBe(tags.length);
  });

  it('should call addTagService when add button is clicked', () => {
    spectator.click(byTestId('add-button'));
    expect(addTagService.execute).toHaveBeenCalled();
  });

  it('should call addTagService after clicking add button', () => {
    addTagService.execute.and.returnValue(of(undefined));
    spectator.click(byTestId('add-button'));
    expect(tagsApiService.getTags).toHaveBeenCalledTimes(2);
  });

  it('should call getCategories after category card emit onChanged', () => {
    spectator.detectChanges();
    spectator.triggerEventHandler('app-tag-card', 'onChanged', undefined);
    expect(tagsApiService.getTags).toHaveBeenCalledTimes(2);
  });
});
