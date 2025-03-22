import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ButtonDirective } from '@shared/directives/button.directive';
import { SharedModule } from '@shared/shared.module';
import { PageComponent } from '../core/page/page/page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    PageComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HeaderMenuComponent,
  ],
  imports: [SharedModule, ButtonDirective],
  exports: [PageComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
