import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  @Output() clicked = new EventEmitter<void>();

  menus: { link: string; name: string; icon: string }[] = [
    {
      link: '/dashboard',
      name: 'Dashboard',
      icon: 'fa-chart-line',
    },
    {
      link: '/transactions',
      name: 'Transações',
      icon: 'fa-list-check',
    },
    {
      link: '/accounts',
      name: 'Contas',
      icon: 'fa-building-columns',
    },
    {
      link: '/categories',
      name: 'Categories',
      icon: 'fa-tag',
    },
    {
      link: '/tags',
      name: 'Tags',
      icon: 'fa-tags',
    },
  ];
}
