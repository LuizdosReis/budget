import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, switchMap } from 'rxjs';
import { AccountFormModalComponent } from '../components/account-form-modal/account-form-modal.component';
import { Account } from '../models/account';
import { AccountsApiService } from './accounts-api.service';
import { DeleteAccountService } from './delete-account.service';

@Injectable({
  providedIn: 'root',
})
export class EditAccountService {
  constructor(
    private dialog: MatDialog,
    private accountsApi: AccountsApiService,
    private deleteAccountService: DeleteAccountService
  ) {}

  run(account: Account): Observable<void> {
    const submitted = new Subject<void>();
    const dialogRef = this.dialog.open(AccountFormModalComponent, {
      data: { account },
    });
    const componentInstance = dialogRef.componentInstance;
    componentInstance.submitAccountForm
      .pipe(switchMap(form => this.accountsApi.put(account.id, form)))
      .subscribe(() => {
        submitted.next();
        dialogRef.close();
      });
    componentInstance.deleteClicked
      .pipe(switchMap(() => this.deleteAccountService.delete(account)))
      .subscribe(() => {
        submitted.next();
        dialogRef.close();
      });

    return submitted;
  }
}
