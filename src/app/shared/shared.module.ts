import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageComponent],
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, RouterModule, PageComponent],
})
export class SharedModule {}
