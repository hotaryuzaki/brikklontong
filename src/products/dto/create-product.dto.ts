// import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

export class CreateProductDto {
  // category: CreateCategoryDto;
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
