import { BaseEntity } from '@base-module/domain/entities/base.entity';

export interface MikroormEntity extends BaseEntity {
  name: string;
  code: string;
  age: number;
}
