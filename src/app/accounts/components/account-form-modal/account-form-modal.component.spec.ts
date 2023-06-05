import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormModalComponent } from './account-form-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

describe('AccountFormModalComponent', () => {
  let component: AccountFormModalComponent;
  let fixture: ComponentFixture<AccountFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule],
      declarations: [AccountFormModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
