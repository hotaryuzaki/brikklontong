import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { AuditLog } from 'src/products/entities/audit-log.entity';
import { ProductSubscriberService } from './product-subscriber.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, AuditLog])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductSubscriberService],
  exports: [ProductsService],
})
export class ProductsModule {}
