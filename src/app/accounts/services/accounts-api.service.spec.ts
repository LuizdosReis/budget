import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { AccountData } from '../models/account-data';
import { AccountsApiService } from './accounts-api.service';

describe('AccountsApiService', () => {
  let spectator: SpectatorHttp<AccountsApiService>;

  const createHttp = createHttpFactory(AccountsApiService);

  beforeEach(() => (spectator = createHttp()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call get accounts', () => {
    spectator.service.getAccounts().subscribe();
    spectator.expectOne(spectator.service.URL, HttpMethod.GET);
  });

  it('should call post with account in the body', () => {
    const account: AccountData = {
      name: 'Nubank',
      currency: 'BRL',
    };

    spectator.service.post(account).subscribe();
    const req = spectator.expectOne(spectator.service.URL, HttpMethod.POST);
    expect(req.request.body).toEqual(account);
  });

  it('should call put with account id in the url and account in the body', () => {
    const id = 'ecdfd059-c798-43f2-8daf-9e8692216632';
    const account: AccountData = {
      name: 'Nubank',
      currency: 'BRL',
    };

    spectator.service.put(id, account).subscribe();
    const req = spectator.expectOne(
      `${spectator.service.URL}/${id}`,
      HttpMethod.PUT
    );
    expect(req.request.body).toEqual(account);
  });

  it('should call delete with account id in the url', () => {
    const id = 'ecdfd059-c798-43f2-8daf-9e8692216632';
    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${spectator.service.URL}/${id}`, HttpMethod.DELETE);
  });
});
