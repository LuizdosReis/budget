import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menus: { link: string; name: string }[] = [
    {
      link: '/dashboard',
      name: 'Dashboard',
    },
    {
      link: '/accounts',
      name: 'Accounts',
    },
  ];

  constructor() {}
}
