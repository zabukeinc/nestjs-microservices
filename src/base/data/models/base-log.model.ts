import { BaseLogEntity } from '@base-module/domain/entities/base-log.entity';
import { Column } from 'typeorm';
import { BaseModel } from './base.model';

export class BaseLogModel extends BaseModel implements BaseLogEntity {
  @Column('varchar', { name: 'action' })
  action: string;

  @Column('varchar', { name: 'endpoint' })
  endpoint: string;

  @Column('int', { name: 'order_id', nullable: true })
  order_id?: number;

  @Column('json', { name: 'request', nullable: true })
  request: string;

  @Column('json', { name: 'response', nullable: true })
  response: string;

  @Column('int', { name: 'status_code' })
  status_code: number;
}
