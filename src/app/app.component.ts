import { Component } from '@angular/core';

interface Page {
  label: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pages: Page[] = [
    {
      label: 'Aufträge',
      url: '/orders',
      icon: 'list_alt'
    },
    {
      label: 'Artikel',
      url: '/items',
      icon: 'inventory'
    }
  ];
  title: string = 'Coding-Challenge';

  constructor() { }
}
