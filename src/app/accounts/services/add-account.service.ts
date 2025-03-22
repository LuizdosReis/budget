import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { AccountFormModalComponent } from '../components/account-form-modal/account-form-modal.component';
import { AccountsApiService } from './accounts-api.service';

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

    dialogRef.componentInstance.submitAccountForm.subscribe(form =>
      this.accountsApi.post(form).subscribe(() => {
        submitted.next();
        dialogRef.close();
      })
    );

    return submitted;
  }
}
