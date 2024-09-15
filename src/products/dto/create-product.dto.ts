export class CreateProductDto {
  CategoryId: number; // This will store the foreign key for the category
  name: string;
  sku: string;
  description: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  image: string;
  price: number;
}
