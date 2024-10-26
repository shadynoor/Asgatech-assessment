import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ApiService } from '../../core/services/mock-api.service';
import { ButtonModule } from 'primeng/button';
import { Order, Product, User } from '../../core/models/model';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputNumberModule,
    FormsModule,
    ProgressSpinnerModule,
    TagModule,
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent implements OnInit {
  private apiService = inject(ApiService);
  // orderId from url
  public orderId = input('orderId');
  public orderSignal = signal<Order>({} as Order);
  public productsSignal = signal<Product[]>([]);
  public productSignal = signal<Product>({} as Product);
  public currentProductQty = signal<number>(0);
  public totalSignal = signal<number>(0);
  public userSignal = signal<User>({} as User);

  public visible = signal<boolean>(false);
  public dialogActionClicked = false;

  ngOnInit(): void {
    this.getCurrentOrder();
    this.getProductsInOrder();
    this.getTotal();
    this.getUserInfo();
  }

  getCurrentOrder(): void {
    this.orderSignal.set(this.apiService.getOrder(+this.orderId()));
  }

  getProductsInOrder() {
    if (this.orderSignal() && this.orderSignal().Products) {
      this.productsSignal.set(
        this.apiService.getOrderDetailsProducts(this.orderSignal().Products)
      );
    }
  }

  updateQuantity() {
    this.dialogActionClicked = true;
    this.productsSignal().forEach((product) => {
      if (product.ProductId === this.productSignal().ProductId) {
        // emulate api call
        setTimeout(() => {
          this.visible.set(false);
          this.dialogActionClicked = false;
          product.qty = this.currentProductQty();
          this.getTotal();
        }, 2000);
      }
    });
  }

  getTotal() {
    let total = 0;
    this.productsSignal().forEach((product) => {
      total += product.qty! * product.ProductPrice;
    });
    this.totalSignal.set(+total.toFixed(1));
  }

  getUserInfo() {
    this.apiService.usersSignal().find((user) => {
      if (user.Id === this.orderSignal().UserId) {
        this.userSignal.set(user);
      }
    });
  }

  showDialog(product: Product) {
    this.productSignal.set(product);
    this.currentProductQty.set(product.qty!);
    this.visible.set(true);
  }
}
