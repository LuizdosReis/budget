import { AccountsApiService } from './accounts-api.service';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { AccountData } from '../models/account-data';

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

  it('should call post account with account in the body', () => {
    const account: AccountData = {
      name: 'Nubank',
      currency: 'BRL',
    };

    spectator.service.post(account).subscribe();
    const req = spectator.expectOne(spectator.service.URL, HttpMethod.POST);
    expect(req.request.body).toEqual(account);
  });
});
