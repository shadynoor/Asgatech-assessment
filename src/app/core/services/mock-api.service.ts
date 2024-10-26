import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Order, Product, ProductsInOrder, User } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  public ordersSignal = signal<Order[]>([]);
  public productsSignal = signal<Product[]>([]);
  public usersSignal = signal<User[]>([]);

  getOrders(): void {
    this.http
      .get<Order[]>(environment.apiBaseUrl + 'orders.json')
      .subscribe((res) => this.ordersSignal.set(res));
  }
  getOrder(orderId: number): Order {
    const order = this.ordersSignal().find((order) => {
      return order.OrderId === orderId;
    });
    return order!;
  }
  getProducts(): void {
    this.http
      .get<Product[]>(environment.apiBaseUrl + 'products.json')
      .subscribe((res) => this.productsSignal.set(res));
  }

  getOrderDetailsProducts(products: ProductsInOrder[]) {
    const productsInOrder: any = [];
    this.productsSignal().forEach((product) => {
      products.forEach((productInOrder) => {
        if (product.ProductId === productInOrder.ProductId) {
          productsInOrder.push({ ...product, qty: productInOrder.Quantity });
        }
      });
    });
    return productsInOrder;
  }
  // Handled in order details component
  editProductQuantity(productId: string, quantity: number) {}

  getUsers() {
    this.http
      .get<User[]>(environment.apiBaseUrl + 'users.json')
      .subscribe((res) => this.usersSignal.set(res));
  }
}
