import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Category, (category) => category.id)
  // category: Category;

  @Column()
  name: string;

  @Column({ unique: true })
  sku: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  length: number;

  @Column({ nullable: true })
  height: number;

  @Column()
  image: string;

  @Column()
  price: number;
}
