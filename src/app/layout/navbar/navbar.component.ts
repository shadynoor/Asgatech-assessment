import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  items: MenuItem[] = [
    {
      label: 'Products',
      icon: 'pi pi-home',
      routerLink: 'products',
    },
    {
      label: 'Orders',
      icon: 'pi pi-star',
      routerLink: 'orders',
    },
  ];
}
