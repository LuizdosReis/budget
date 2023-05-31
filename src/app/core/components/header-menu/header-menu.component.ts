import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent {
  isMenuOpen = false;

  constructor(private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickOut(event: PointerEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
