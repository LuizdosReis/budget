import { TestBed } from '@angular/core/testing';

import { MonthSwiperSkeletonComponent } from './month-swiper-skeleton.component';

describe('MonthSwiperSkeletonComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthSwiperSkeletonComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(MonthSwiperSkeletonComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
