import { BaseModel} from '@base-module/data/models/base.model';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserPinEntity } from '../../domain/entities/user-pin.entity';
import { UserModel } from './user.model';

@Entity({ name: 'user_pins' })
export class UserPinModel extends BaseModel implements UserPinEntity {
  @Column('int', { name: 'user_id', nullable: true })
  user_id: number;

  @OneToOne(() => UserModel, (model) => model.user_pin, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @Column('varchar', { name: 'pin', nullable: true })
  pin: string;
}
