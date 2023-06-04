import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { AuthService } from '@app/core/services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj<AuthService>('AuthService', ['logout']);
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: spy }],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change isMenuOpen to true when click on the button twice', () => {
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('click', null);

    expect(component.isMenuOpen).toBeTrue();
  });

  it('should change isMenuOpen to false when click on the button twice', () => {
    for (let i = 1; i <= 2; i++) {
      fixture.debugElement
        .query(By.css('button'))
        .triggerEventHandler('click', null);
    }

    expect(component.isMenuOpen).toBeFalse();
  });

  it('should logout when click in logout button', () => {
    fixture.debugElement
      .query(By.css('[data-testid="logout-button"]'))
      .triggerEventHandler('click', null);

    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
