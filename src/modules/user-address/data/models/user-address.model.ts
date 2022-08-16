import { BaseModel } from 'src/base/data/models/base.model';
import { UserModel } from 'src/modules/user/data/models/user.model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserAddressEntity } from '../../domain/entities/user-address.entity';

@Entity({ name: 'user_addresses' })
export class UserAddressModel extends BaseModel implements UserAddressEntity {
  @Column('decimal', { name: 'latitude', nullable: true })
  latitude: number;

  @Column('decimal', { name: 'longitude', nullable: true })
  longitude: number;

  @Column('varchar', { name: 'name', nullable: true })
  name: string;

  @Column('varchar', { name: 'street_name', nullable: true })
  street_name: string;

  @Column('varchar', { name: 'province', nullable: true })
  province: string;

  @Column('varchar', { name: 'city', nullable: true })
  city: string;

  @Column('varchar', { name: 'district', nullable: true })
  district: string;

  @Column('varchar', { name: 'sub_district', nullable: true })
  sub_district: string;

  @Column('text', { name: 'address', nullable: true })
  address: string;

  @Column('varchar', { name: 'postal_code', nullable: true })
  postal_code: string;

  @Column('text', { name: 'note', nullable: true })
  note: string;

  @Column('boolean', { name: 'is_default', nullable: true })
  is_default: boolean;

  @Column('int', { name: 'user_id', nullable: true })
  user_id?: number;

  @ManyToOne(() => UserModel, (model) => model.user_addresses, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserModel;
}
