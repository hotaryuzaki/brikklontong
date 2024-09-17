import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from 'src/products/entities/product.entity';

export enum statusOrder {
  PAID = 'paid',
  UNPAID = 'unpaid',
  EXPIRED = 'expired',
}

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codeOrder: string;

  @Column()
  paymentCode: string;

  // The foreign key column from the "cart" table
  @Column()
  cartId: number;

  // The foreign key column from the "products" table
  @Column()
  productId: number;

  // Many carts belong to one product
  @ManyToOne(() => Product, (product) => product.id, { eager: true }) // Eager loading to automatically load the product
  @JoinColumn({ name: 'productId' }) // This maps the foreign key to the relation
  product: Product;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP + INTERVAL '1 day'",
  })
  expireAt: Date;

  @Column()
  price: number;

  @Column()
  deliveryPrice: number;

  @Column()
  grandTotal: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  bankProvider: string;

  @Column({ type: 'float', nullable: true })
  bankAccount: number;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: statusOrder,
    default: statusOrder.UNPAID,
  })
  statusOrder: statusOrder;
}
