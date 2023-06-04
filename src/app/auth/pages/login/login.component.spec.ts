import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationResponse } from '@shared/models/authentication-response.model';
import { AuthService } from '@app/core/services/auth.service';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  const authenticationResponse: AuthenticationResponse = {
    accessToken: 'accessToken',
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useValue: spy }],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService.login.and.returnValue(of(authenticationResponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow user to log in', () => {
    const form = {
      username: 'username',
      password: 'password',
    };

    component.loginForm.setValue(form);
    component.login();
    expect(authService.login).toHaveBeenCalledWith(
      form.username,
      form.password
    );
  });

  it('should not allow user login in form invalid', () => {
    component.login();
    expect(authService.login).toHaveBeenCalledTimes(0);
  });

  it('should show unauthorized message when auth login returns error', () => {
    authService.login.and.returnValue(
      throwError(() => {
        error: 401;
      })
    );

    const form = {
      username: 'username',
      password: 'password',
    };

    component.loginForm.setValue(form);
    component.login();
    fixture.detectChanges();

    expect(component.isUnauthorized).toBeTruthy();

    expect(
      fixture.debugElement.query(By.css('[data-testid="unauthorized-error"]'))
    ).toBeTruthy();
  });
});
