import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Account } from '../../models/account';
import { EditAccountService } from '../../services/edit-account.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
  @Input() account!: Account;

  destroyRef = inject(DestroyRef);

  @Output() edited = new EventEmitter<void>();

  constructor(private editAccountService: EditAccountService) {}

  edit(): void {
    this.editAccountService
      .run(this.account)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.edited.next());
  }
}
