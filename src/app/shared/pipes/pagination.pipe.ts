import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../../core/models/model';

@Pipe({ name: 'pagination', standalone: true })
export class PaginationPipe implements PipeTransform {
  transform(array: Order[], currentPage: number): any {
    return array.slice((currentPage - 1) * 10, currentPage * 10);
  }
}
