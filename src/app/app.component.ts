import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './core/services/mock-api.service';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsComponent, OrdersComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  apiService = inject(ApiService);
  title = 'assessment';
  ngOnInit(): void {
    // Emulate api calls to get data
    // to make sure no data is failed i run it all here instead of running each api call in it's related component
    this.apiService.getOrders();
    this.apiService.getProducts();
    this.apiService.getUsers();
  }
}
