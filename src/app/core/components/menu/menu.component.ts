import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Output() clicked = new EventEmitter<void>();

  menus: { link: string; name: string; icon: string }[] = [
    {
      link: '/dashboard',
      name: 'Dashboard',
      icon: 'dashboard',
    },
    {
      link: '/accounts',
      name: 'Contas',
      icon: 'account_balance',
    },
  ];
}
