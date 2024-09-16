import { Injectable } from '@nestjs/common';
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { AuditLog } from 'src/products/entities/audit-log.entity';

@EventSubscriber()
@Injectable()
export class ProductSubscriberService implements EntitySubscriberInterface<Product> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {
    // Register the subscriber
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  async afterInsert(event: InsertEvent<Product>): Promise<void> {
    await this.logAudit(
      'INSERT',
      event.entity.id,
      null,
      event.entity as Product,
    );
  }

  async afterUpdate(event: UpdateEvent<Product>): Promise<void> {
    await this.logAudit(
      'UPDATE',
      event.entity.id,
      event.databaseEntity,
      event.entity as Product,
    );
  }

  async afterRemove(event: RemoveEvent<Product>): Promise<void> {
    await this.logAudit(
      'DELETE',
      event.databaseEntity.id,
      event.entity as Product,
      null,
    );
  }

  private async logAudit(
    operationType: string,
    recordId: number,
    oldData: Product | null,
    newData: Product | null,
    changeBy: number = 1, // THIS FIELD WILL FILL BY THE USER ID, CURRENTLY WE ASSUME AS 1
  ) {
    const auditLog = new AuditLog();
    auditLog.tableName = 'products';
    auditLog.recordId = recordId;
    auditLog.operationType = operationType;
    auditLog.oldData = oldData ? JSON.stringify(oldData) : null;
    auditLog.newData = newData ? JSON.stringify(newData) : null;
    auditLog.changeBy = changeBy;

    try {
      await this.auditLogRepository.save(auditLog);
      console.log(`Audit log for ${operationType} saved`);
    } catch (error) {
      console.error(`Error saving audit log for ${operationType}`, error);
    }
  }

  async onModuleInit() {
    console.log('ProductSubscriber initialized');
  }
}
