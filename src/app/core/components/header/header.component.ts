import { Component } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(private authService: AuthService) {}

  openMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
