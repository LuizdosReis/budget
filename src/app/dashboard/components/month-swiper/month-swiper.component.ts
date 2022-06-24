import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-month-swiper',
  templateUrl: './month-swiper.component.html',
  styleUrls: ['./month-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MonthSwiperComponent {
  slides = Array.from({ length: 11 }).map((_, index) => `Slide ${index + 1}`);

  constructor() {}
}
