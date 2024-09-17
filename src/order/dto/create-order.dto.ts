export class CreateOrderDto {
  productId: number;
  cartId: number;
  adress: string;
  bankProvider: string;
  bankAccount: number;
}
