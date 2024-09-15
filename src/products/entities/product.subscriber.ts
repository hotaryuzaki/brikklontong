// BookEntitySubscriber.ts
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
  SoftRemoveEvent,
} from 'typeorm';
import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  listenTo() {
    // This allows us listen to a specific entity (table)
    return Product;
  }

  afterInsert(_: InsertEvent<Product>) {}
  afterUpdate(_: UpdateEvent<Product>) {}
  afterRemove(_: RemoveEvent<Product>) {}
  afterSoftRemove(_: SoftRemoveEvent<Product>) {}
}
