import { BaseEntity } from '@base-module/domain/entities/base.entity';

export interface CredentialEntity extends BaseEntity {
  token: string;
  details: string;
}
