import { BaseLogModel } from '@base-module/data/models/base-log.model';
import { ProductLogEntity } from '@product-log-module/domain/entities/product-log.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'logs' })
export class ProductLogModel extends BaseLogModel implements ProductLogEntity {}
