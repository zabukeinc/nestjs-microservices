import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { MikroormEntity } from '../../domain/entities/mikroorm.entity';

@Entity({ tableName: 'mikroorms' })
export class MikroormModel implements MikroormEntity {
  @PrimaryKey({
    autoincrement: true,
    type: 'int',
  })
  id: number;

  @Property({
    type: 'string',
    length: 30,
    fieldName: 'name',
  })
  name: string;

  @Property({
    type: 'string',
    length: 30,
  })
  code: string;

  @Property({
    type: 'int',
    length: 2,
  })
  age: number;

  @Property({
    type: 'datetime',
    onCreate: () => new Date(),
  })
  created_at: Date;

  @Property({
    type: 'datetime',
    onUpdate: () => new Date(),
  })
  updated_at: Date;

  @Property({ type: 'datetime' })
  deleted_at: Date;
}
