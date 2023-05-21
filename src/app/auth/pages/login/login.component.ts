import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  isSubmitting = false;
  isUnauthorized = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
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
