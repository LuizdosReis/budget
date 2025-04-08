import { MatDialog } from '@angular/material/dialog';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { delay, Observable, of } from 'rxjs';
import { Tag } from '../models/tag';
import { DeleteTagService } from './delete-tag.service';
import { TagsApiService } from './tags-api.service';

describe('DeleteTagService', () => {
  let spectator: SpectatorService<DeleteTagService>;

  const createService = createServiceFactory<DeleteTagService>({
    service: DeleteTagService,
    mocks: [MatDialog, TagsApiService],
  });
  const createDialogRef = (overrides?: { confirmed?: Observable<void> }) => ({
    componentInstance: {
      confirmed: of(),
      ...overrides,
    },
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call api service with category when dialog is confirmed', done => {
    const tag: Tag = {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
      name: 'Tag',
    };
    const dialogRef = createDialogRef({
      confirmed: of(undefined).pipe(delay(500)),
    });
    spectator.inject(MatDialog).open.andReturn(dialogRef);
    const tagsApiService = spectator.inject(TagsApiService);
    tagsApiService.delete.and.returnValue(of(undefined));

    spectator.service.execute(tag).subscribe(() => {
      expect(tagsApiService.delete).toHaveBeenCalledWith(tag.id);
      done();
    });
  });
});
