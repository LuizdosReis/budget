import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { Tag } from '../models/tag';
import { TagsApiService } from './tags-api.service';

describe('TagsApiService', () => {
  let spectator: SpectatorHttp<TagsApiService>;

  const createHttp = createHttpFactory(TagsApiService);

  beforeEach(() => (spectator = createHttp()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('getTags should make a GET request with the correct URL', done => {
    const expectedTags: Tag[] = [
      {
        id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
        name: 'Tag1',
      },
      {
        id: 'ecdfd059-c798-43f2-8daf-9e8692216633',
        name: 'Tag2',
      },
    ];

    spectator.service.getTags().subscribe((tags: Tag[]) => {
      expect(tags).toBe(expectedTags);
      done();
    });

    const req = spectator.expectOne(spectator.service.URL, HttpMethod.GET);

    req.flush(expectedTags);
  });
});
