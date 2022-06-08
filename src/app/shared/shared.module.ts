import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, PageComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, RouterModule, PageComponent],
})
export class SharedModule {}
