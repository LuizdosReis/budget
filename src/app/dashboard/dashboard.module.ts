import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from '@shared/shared.module';

import { AccountDashboardCardComponent } from './components/account-card/account-dashboard-card.component';
import { AccountCardSkeletonComponent } from './components/account-card-skeleton/account-card-skeleton.component';
import { AccountModalComponent } from './components/account-modal/account-modal.component';
import { MonthSwiperComponent } from './components/month-swiper/month-swiper.component';
import { MonthSwiperSkeletonComponent } from './components/month-swiper-skeleton/month-swiper-skeleton.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MonthSwiperComponent,
    AccountDashboardCardComponent,
    AccountCardSkeletonComponent,
    MonthSwiperSkeletonComponent,
    AccountModalComponent,
  ],
  imports: [DashboardRoutingModule, SharedModule, SwiperModule],
})
export class DashboardModule {}
