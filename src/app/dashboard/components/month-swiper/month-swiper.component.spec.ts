import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthSwiperComponent } from './month-swiper.component';

describe('MonthSwiperComponent', () => {
  let component: MonthSwiperComponent;
  let fixture: ComponentFixture<MonthSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthSwiperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
