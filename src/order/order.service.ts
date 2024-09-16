import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    let order = this.orderRepository.create(createOrderDto);
    console.log(order.productId);

    const product = await this.productsService.findOne(order.productId);

    console.log('product', product);

    // {
    //   id: 37,
    //   CategoryId: 2,
    //   categoryName: 'Cemilan',
    //   sku: '93',
    //   name: 'sop daging',
    //   description: 'DAGING mahal',
    //   weight: 2,
    //   width: 2,
    //   length: 3,
    //   height: 3,
    //   image: 'nestjs logo-e9ec-1726432174306.png',
    //   price: 12000
    // }

    const code_order = Array(6)
      .fill(null)
      .map(() => Math.random().toString().substring(2, 3))
      .join('');
    const payment_code = Array(6)
      .fill(null)
      .map(() => Math.random().toString().substring(2, 3))
      .join('');

    order = {
      ...order,
      codeOrder: 'C' + code_order,
      paymentCode: 'P' + payment_code,
      price: product.price,
      deliveryPrice: 10000, // CURRENTLY WE SET WITH THE DEFAULT VALUE 10.000
      grandTotal: product.price + 10000,
      userId: 1, // THIS FIELD WILL FILL BY THE USER ID, CURRENTLY WE ASSUME AS 1
    };

    console.log('order', order);

    const cartAdd = await this.orderRepository.save(order);

    return cartAdd;

    return {
      id: cartAdd.id,
      codeOrder: product.CategoryId,
      paymentCode: product.sku,
      productId: product.name,
      createAt: product.description,
      expireAt: product.weight,
      price: product.width,
      deliveryPrice: product.length,
      grandTotal: product.height,
      userId: product.image,
      statusOrder: product.price,
    };
  }

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException();
    }

    Object.assign(order, updateOrderDto);

    return await this.orderRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException();
    }

    return await this.orderRepository.remove(order);
  }
}
