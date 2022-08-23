import { BaseModel } from '@base-module/data/models/base.model';
import { ProductLogEntity } from '@product-module/domain/entities/log/product-log.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: '__log_products' })
export class ProductLogModel extends BaseModel implements ProductLogEntity {
  @Column('varchar', { name: 'action' })
  action: string;

  @Column('int', { name: 'order_id', nullable: true })
  order_id?: number;

  @Column('json', { name: 'request', nullable: true })
  request: string;

  @Column('json', { name: 'response', nullable: true })
  response: string;

  @Column('int', { name: 'status_code', nullable: true })
  status_code: number;
}
