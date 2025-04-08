import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { Tag } from '../models/tag';
import { TagRequest } from '../models/tag-request';
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

  it('post should make a POST call with tag in the body', () => {
    const tag: TagRequest = {
      name: 'Tag_name',
    };

    spectator.service.post(tag).subscribe();
    const req = spectator.expectOne(spectator.service.URL, HttpMethod.POST);
    expect(req.request.body).toEqual(tag);
  });

  it('delete should make a DELETE call with id in the url', () => {
    const id = 'ecdfd059-c798-43f2-8daf-9e8692216632';
    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${spectator.service.URL}/${id}`, HttpMethod.DELETE);
  });
});
