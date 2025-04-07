import { MatDialog } from '@angular/material/dialog';
import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator';
import { delay, of } from 'rxjs';
import { AddTagService } from './add-tag.service';
import { TagsApiService } from './tags-api.service';

describe('AddTagService', () => {
  let spectator: SpectatorService<AddTagService>;
  let categoriesApiService: SpyObject<TagsApiService>;

  const createService = createServiceFactory({
    service: AddTagService,
    mocks: [TagsApiService, MatDialog],
  });

  beforeEach(() => {
    spectator = createService();
    categoriesApiService = spectator.inject(TagsApiService);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call tagsApiService.post with form data when form is submitted', done => {
    const form = {};
    const dialogRef = {
      componentInstance: {
        onSubmit: of(form).pipe(delay(500)),
      },
      close: jasmine.createSpy('close'),
    };

    spectator.inject(MatDialog).open.andReturn(dialogRef);
    categoriesApiService.post.and.returnValue(of({}));
    spectator.service.execute().subscribe(() => {
      expect(categoriesApiService.post).toHaveBeenCalledWith(form);
      expect(dialogRef.close).toHaveBeenCalled();
      done();
    });
  });
});
