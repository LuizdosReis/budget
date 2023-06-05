import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AccountFormModalComponent } from '@app/accounts/components/account-form-modal/account-form-modal.component';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';
import { AccountsApiService } from '@app/accounts/services/accounts-api.service';

@Injectable({
  providedIn: 'root',
})
export class AddAccountService {
  constructor(
    private dialog: MatDialog,
    private accountsApi: AccountsApiService
  ) {}

  run(): Observable<void> {
    const submitted = new Subject<void>();
    const dialogRef = this.dialog.open(AccountFormModalComponent);

    dialogRef.componentInstance.submitAccountForm.subscribe(accountForm => {
      this.accountsApi
        .post(accountForm)
        .pipe(
          catchError(() => {
            dialogRef.componentInstance.isSubmitting = false;
            return EMPTY;
          })
        )
        .subscribe(() => {
          submitted.next();
          dialogRef.close();
        });
    });

    return submitted;
  }
}
