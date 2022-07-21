import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MonthYear } from '../../models/monthYear';

@Component({
  selector: 'app-month-swiper',
  templateUrl: './month-swiper.component.html',
  styleUrls: ['./month-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MonthSwiperComponent {
  @Input() currentMonthYear!: MonthYear;
  @Input() monthsYears!: MonthYear[];

  @Output() selectMonthYear = new EventEmitter<MonthYear>();

  constructor() {}

  get currentMonthYearIndex(): number {
    return this.monthsYears.findIndex((monthYear: MonthYear) =>
      this.isCurrentMonthYear(monthYear)
    );
  }

  isCurrentMonthYear(monthYear: MonthYear): boolean {
    return (
      monthYear.month === this.currentMonthYear.month &&
      monthYear.year === this.currentMonthYear.year
    );
  }
}
