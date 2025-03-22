import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, switchMap } from 'rxjs';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { Account } from '../models/account';
import { AccountsApiService } from '../services/accounts-api.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteAccountService {
  constructor(
    private dialog: MatDialog,
    private accountsApiService: AccountsApiService
  ) {}

  delete(account: Account): Observable<void> {
    const deleted = new Subject<void>();
    const matDialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Deletar conta',
        message: `Tem certeza que deseja deletar  ${account.name}?`,
        confirmationLabel: 'Deletar',
      },
    });

    matDialogRef.componentInstance.confirmed
      .pipe(switchMap(() => this.accountsApiService.delete(account.id)))
      .subscribe(() => {
        deleted.next();
        matDialogRef.close();
      });
    return deleted;
  }
}
