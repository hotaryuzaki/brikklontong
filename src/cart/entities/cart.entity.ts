import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from 'src/products/entities/product.entity';

export enum statusCart {
  CART = 'cart',
  EXPIRED = 'expired',
  ORDER = 'order',
}

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codeOrder: string;

  @Column()
  paymentCode: string;

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

  @Column({ nullable: true })
  expireAt: Date;

  @Column()
  price: number;

  @Column()
  deliveryPrice: number;

  @Column()
  grandTotal: number;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: statusCart,
    default: statusCart.CART,
  })
  statusCart: statusCart;
}
