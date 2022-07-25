import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SwiperModule } from 'swiper/angular';
import { MonthSwiperComponent } from './components/month-swiper/month-swiper.component';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { AccountCardSkeletonComponent } from './components/account-card-skeleton/account-card-skeleton.component';
import { MonthSwiperSkeletonComponent } from './components/month-swiper-skeleton/month-swiper-skeleton.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MonthSwiperComponent,
    AccountCardComponent,
    AccountCardSkeletonComponent,
    MonthSwiperSkeletonComponent,
  ],
  imports: [DashboardRoutingModule, SharedModule, SwiperModule],
})
export class DashboardModule {}
