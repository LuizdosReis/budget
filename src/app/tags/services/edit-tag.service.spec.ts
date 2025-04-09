import { MatDialog } from '@angular/material/dialog';
import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator';
import { delay, of } from 'rxjs';
import { Tag } from '../models/tag';
import { EditTagService } from './edit-tag.service';
import { TagsApiService } from './tags-api.service';

describe('EditTagService', () => {
  let spectator: SpectatorService<EditTagService>;
  let tagApiService: SpyObject<TagsApiService>;

  const tag: Tag = {
    id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
    name: 'tag_name',
  };

  const createService = createServiceFactory({
    service: EditTagService,
    mocks: [TagsApiService, MatDialog],
  });

  beforeEach(() => {
    spectator = createService();
    tagApiService = spectator.inject(TagsApiService);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call tagApiService put with form data and dialogRef close when form is submitted', done => {
    const form = {
      name: tag.name,
    };

    const dialogRef = {
      componentInstance: {
        onSubmit: of(form).pipe(delay(500)),
      },
      close: jasmine.createSpy('close'),
    };

    spectator.inject(MatDialog).open.andReturn(dialogRef);
    tagApiService.put.and.returnValue(of({}));
    spectator.service.execute(tag).subscribe(() => {
      expect(tagApiService.put).toHaveBeenCalledWith(tag.id, form);
      expect(dialogRef.close).toHaveBeenCalled();
      done();
    });
  });
});
