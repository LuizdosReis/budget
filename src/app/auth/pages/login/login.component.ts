import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: UntypedFormGroup;
  submitted = false;
  isSubmitting = false;
  isUnauthorized = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
    });
  }

  login(): void {
    this.submitted = true;
    this.isUnauthorized = false;

    if (this.loginForm.valid) {
      this.isSubmitting = true;
      const { username, password } = this.loginForm.value;

      this.authService
        .login(username, password)
        .pipe(finalize(() => (this.isSubmitting = false)))
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/').catch(error => {
              console.error('Navigation failed:', error);
            });
          },
          error: () => (this.isUnauthorized = true),
        });
    }
  }
}
