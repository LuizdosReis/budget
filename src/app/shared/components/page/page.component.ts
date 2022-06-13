import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  isSidebarOpen = false;

  constructor() {}

  openSideBar(): void {
    this.isSidebarOpen = true;
  }
}
