import { BaseModel } from '@base-module/data/models/base.model';
import { CredentialEntity } from '@product-module/domain/entities/credential.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'credentials' })
export class CredentialModel extends BaseModel implements CredentialEntity {
  @Column('varchar', { name: 'token' })
  token: string;

  @Column('json', { name: 'details' })
  details: string;
}
