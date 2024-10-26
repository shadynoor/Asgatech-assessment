import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../../core/models/model';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonModule, TagModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  product = input.required<Product>();
}
