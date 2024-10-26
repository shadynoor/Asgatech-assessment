export interface Product {
  AvailablePieces: number;
  ProductId: number;
  ProductImg: string;
  ProductName: string;
  ProductPrice: number;
  qty?: number;
}
export interface Order {
  OrderDate: string;
  OrderId: number;
  PaymentType: string;
  Products: ProductsInOrder[];
  UserId: string;
}

export interface ProductsInOrder {
  ProductId: number;
  Quantity: number;
}

export enum TypesForPagination {
  NEXT = 'next',
  PREVIOUS = 'prev',
}

export interface User {
  Id: string;
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
  RegisterDate: string;
}
