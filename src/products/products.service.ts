import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    // Save the filename or path of the uploaded image
    const product = this.productRepository.create({
      ...createProductDto,
      image: file ? file.filename : null, // Save the filename of the uploaded image
    });

    await this.productRepository.save(product);

    const productAdd = await this.productRepository.findOne({
      where: { id: product.id },
    });

    // Transform the data to match your desired schema
    return {
      id: productAdd.id,
      CategoryId: productAdd.CategoryId,
      categoryName: productAdd.category.name,
      sku: productAdd.sku,
      name: productAdd.name,
      description: productAdd.description,
      weight: productAdd.weight,
      width: productAdd.width,
      length: productAdd.length,
      height: productAdd.height,
      image: productAdd.image,
      price: productAdd.price,
    };
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const [products, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['category'], // Include related category
    });

    // Transform the data to match your desired schema
    const result = products.map((product) => ({
      id: product.id,
      CategoryId: product.CategoryId,
      categoryName: product.category.name,
      sku: product.sku,
      name: product.name,
      description: product.description,
      weight: product.weight,
      width: product.width,
      length: product.length,
      height: product.height,
      image: product.image,
      price: product.price,
    }));

    return {
      data: result,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    // Transform the data to match your desired schema
    return {
      id: product.id,
      CategoryId: product.CategoryId,
      categoryName: product.category.name,
      sku: product.sku,
      name: product.name,
      description: product.description,
      weight: product.weight,
      width: product.width,
      length: product.length,
      height: product.height,
      image: product.image,
      price: product.price,
    };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    file?: Express.Multer.File,
  ) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (file) {
      product.image = file.filename; // Update the image if a new file is uploaded
    }

    Object.assign(product, updateProductDto);
    await this.productRepository.save(product);

    const price =
      typeof product.price === 'string'
        ? parseInt(product.price, 10)
        : product.price;

    // Transform the data to match your desired schema
    return {
      id: product.id,
      CategoryId: product.CategoryId,
      categoryName: product.category.name,
      sku: product.sku,
      name: product.name,
      description: product.description,
      weight: product.weight,
      width: product.width,
      length: product.length,
      height: product.height,
      image: product.image,
      price: !isNaN(price) ? price : null, // Ensure it's a number or null
    };
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productRepository.remove(product);

    // Transform the data to match your desired schema
    return {
      id: product.id,
      CategoryId: product.CategoryId,
      categoryName: product.category.name,
      sku: product.sku,
      name: product.name,
      description: product.description,
      weight: product.weight,
      width: product.width,
      length: product.length,
      height: product.height,
      image: product.image,
      price: product.price,
    };
  }
}
