import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  // The foreign key column in the "products" table
  @Column()
  CategoryId: number;

  // Many products belong to one category
  @ManyToOne(() => Category, (category) => category.id, { eager: true }) // Eager loading to automatically load the category
  @JoinColumn({ name: 'CategoryId' }) // This maps the foreign key to the relation
  category: Category;

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
