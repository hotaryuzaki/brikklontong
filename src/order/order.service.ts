import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, statusOrder } from './entities/order.entity';
import { ProductsService } from '../products/products.service';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    let order = this.orderRepository.create(createOrderDto);
    const cart = await this.cartService.findOne(order.cartId);
    const product = await this.productsService.findOne(order.productId);

    order = {
      ...order,
      codeOrder: cart.codeOrder,
      paymentCode: cart.paymentCode,
      price: product.price,
      deliveryPrice: 10000, // CURRENTLY WE SET WITH THE DEFAULT VALUE 10.000
      grandTotal: product.price + 10000,
      userId: 1, // THIS FIELD WILL FILL BY THE USER ID, CURRENTLY WE ASSUME AS 1
    };

    Object.assign(cart, { statusCart: 'order' });
    await this.cartService.update(order.cartId, cart);

    const orderAdd = await this.orderRepository.save(order);
    return orderAdd;
  }

  async findAll() {
    return await this.orderRepository.find({
      where: { statusOrder: statusOrder.UNPAID },
    });
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
