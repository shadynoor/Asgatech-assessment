import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders/orders.component').then((c) => c.OrdersComponent),
  },

  {
    path: 'order-details/:orderId',
    loadComponent: () =>
      import('./pages/order-details/order-details.component').then(
        (c) => c.OrderDetailsComponent
      ),
  },
];
