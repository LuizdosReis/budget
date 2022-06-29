import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SwiperModule } from 'swiper/angular';
import { MonthSwiperComponent } from './components/month-swiper/month-swiper.component';
import { AccountCardComponent } from './components/account-card/account-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MonthSwiperComponent,
    AccountCardComponent,
  ],
  imports: [DashboardRoutingModule, SharedModule, SwiperModule],
})
export class DashboardModule {}
