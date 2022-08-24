import { AccountLogEntity } from '@account-log-module/domain/entities/account-log.entity';
import { BaseLogModel } from '@base-module/data/models/base-log.model';
import { Entity } from 'typeorm';

@Entity({ name: 'products__log' })
export class ProductLogModel extends BaseLogModel implements AccountLogEntity {}
