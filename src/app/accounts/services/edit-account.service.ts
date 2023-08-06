import { Injectable } from '@angular/core';
import { Account } from '@app/accounts/models/account';
import { Observable, Subject } from 'rxjs';
import { AccountFormModalComponent } from '@app/accounts/components/account-form-modal/account-form-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountsApiService } from '@app/accounts/services/accounts-api.service';

@Injectable({
  providedIn: 'root',
})
export class EditAccountService {
  constructor(
    private dialog: MatDialog,
    private accountsApi: AccountsApiService
  ) {}

  run(account: Account): Observable<void> {
    const submitted = new Subject<void>();
    const dialogRef = this.dialog.open(AccountFormModalComponent, {
      data: { account },
    });

    dialogRef.componentInstance.submitAccountForm.subscribe(form =>
      this.accountsApi.put(account.id, form).subscribe(() => {
        submitted.next();
        dialogRef.close();
      })
    );

    return submitted;
  }
}
