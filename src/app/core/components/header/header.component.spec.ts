import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
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
});
