import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createCartDto: CreateCartDto) {
    let cart = this.cartRepository.create(createCartDto);
    const product = await this.productsService.findOne(cart.productId);

    const code_order = Array(6)
      .fill(null)
      .map(() => Math.random().toString().substring(2, 3))
      .join('');
    const payment_code = Array(6)
      .fill(null)
      .map(() => Math.random().toString().substring(2, 3))
      .join('');

    cart = {
      ...cart,
      codeOrder: 'C' + code_order,
      paymentCode: 'P' + payment_code,
      price: product.price,
      deliveryPrice: 10000, // CURRENTLY WE SET WITH THE DEFAULT VALUE 10.000
      grandTotal: product.price + 10000,
      userId: 1, // THIS FIELD WILL FILL BY THE USER ID, CURRENTLY WE ASSUME AS 1
    };

    const cartAdd = await this.cartRepository.save(cart);
    return cartAdd;
  }

  async findAll() {
    return await this.cartRepository.find();
  }

  async findOne(id: number) {
    return await this.cartRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const cart = await this.findOne(id);
    if (!cart) {
      throw new NotFoundException();
    }

    Object.assign(cart, updateCartDto);

    return await this.cartRepository.save(cart);
  }

  async remove(id: number) {
    const cart = await this.findOne(id);
    if (!cart) {
      throw new NotFoundException();
    }

    return await this.cartRepository.remove(cart);
  }
}
