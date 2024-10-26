import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ApiService } from '../../core/services/mock-api.service';
import { SlicePipe } from '@angular/common';
import { PaginationPipe } from '../../shared/pipes/pagination.pipe';
import { Order, TypesForPagination } from '../../core/models/model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [PaginationPipe, TableModule, SlicePipe, ButtonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  // Start Serivces
  private apiService = inject(ApiService);
  // End Serivces

  // Start Public Variables
  public ordersSignal = signal<Order[]>([]);
  public currentPage = 1;
  public typesOfPagination = TypesForPagination;
  public Math: Math = Math;
  // End Public Variables

  constructor() {
    this.ordersSignal.set(this.apiService.ordersSignal());
  }

  changePage(type: string) {
    if (type == this.typesOfPagination.NEXT) {
      if (this.currentPage < Math.ceil(this.ordersSignal().length / 10)) {
        this.currentPage++;
      }
    } else {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
}
