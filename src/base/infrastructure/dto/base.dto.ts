import { BaseEntity } from 'src/base/domain/entities/base.entity';

export class BaseDTO implements BaseEntity {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
