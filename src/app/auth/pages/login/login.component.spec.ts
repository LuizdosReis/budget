import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '@shared/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthenticationResponse } from '@shared/models/authentication-response.model';
import { ReactiveFormsModule } from '@angular/forms';

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
});
