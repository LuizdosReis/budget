import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthYear } from '../../models/monthYear';

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
    component.monthsYears = [
      {
        year: 2022,
        month: 7,
      },
    ];

    component.currentMonthYear = {
      year: 2022,
      month: 7,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#isCurrentMonthYear should return true when currentMonthYear and parameter have same year and month', () => {
    const monthYear: MonthYear = {
      year: 2022,
      month: 7,
    };

    expect(component.isCurrentMonthYear(monthYear)).toBeTrue();
  });

  it('#isCurrentMonthYear should return false when currentMonthYear and parameter do not have same year', () => {
    const monthYear: MonthYear = {
      year: 2023,
      month: 7,
    };

    expect(component.isCurrentMonthYear(monthYear)).toBeFalse();
  });

  it('#isCurrentMonthYear should return false when currentMonthYear and parameter do not have same month', () => {
    const monthYear: MonthYear = {
      year: 2022,
      month: 8,
    };

    expect(component.isCurrentMonthYear(monthYear)).toBeFalse();
  });

  it('#isCurrentMonthYear should return false when currentMonthYear and parameter do not have same month and year', () => {
    const monthYear: MonthYear = {
      year: 2023,
      month: 8,
    };

    expect(component.isCurrentMonthYear(monthYear)).toBeFalse();
  });

  it('#isCurrentMonthYear should return false when currentMonthYear and parameter do not have same month and year', () => {
    const monthYear: MonthYear = {
      year: 2023,
      month: 8,
    };

    expect(component.isCurrentMonthYear(monthYear)).toBeFalse();
  });

  it('#currentMonthYearIndex should return the index of the current month year on the monthsYears array ', () => {
    expect(component.currentMonthYearIndex).toBe(0);
  });

  it('#currentMonthYearIndex should return -1 when monthsYears array does not contain the current month year ', () => {
    component.currentMonthYear = {
      year: 2023,
      month: 7,
    };

    expect(component.currentMonthYearIndex).toBe(-1);
  });
});
