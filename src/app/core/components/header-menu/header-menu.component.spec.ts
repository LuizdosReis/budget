import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderMenuComponent } from './header-menu.component';

describe('HeaderMenuComponent', () => {
  let component: HeaderMenuComponent;
  let fixture: ComponentFixture<HeaderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuComponent);
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
});
