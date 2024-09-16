import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('auditLogs')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tableName: string;

  @Column()
  recordId: number;

  @Column()
  operationType: string; // INSERT, UPDATE, DELETE

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  operationTime: Date;

  @Column('jsonb', { nullable: true })
  oldData: any; // Store old row data

  @Column('jsonb', { nullable: true })
  newData: any; // Store new row data

  @Column()
  changeBy: number;
}
