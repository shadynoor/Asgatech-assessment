import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../core/services/mock-api.service';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/model';
import { AsyncPipe } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  // Services Start
  private apiService = inject(ApiService);
  // Services End

  // Public Variables Start
  public products = this.apiService.productsSignal();
  // Public Variables End

  ngOnInit(): void {}
}
