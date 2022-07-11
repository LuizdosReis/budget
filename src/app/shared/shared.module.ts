import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageComponent,
    MenuComponent,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [CommonModule, RouterModule, PageComponent],
})
export class SharedModule {}
