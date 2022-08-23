import { LoginResponseAuthEntity } from 'src/modules/product/domain/entities/auth/login-response.auth.entity';
import { CredentialEntity } from 'src/modules/product/domain/entities/credential.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { HOPE_COMMAND_CONNECTION } from '@utils/global.util';
import { CredentialModel } from '../models/credential.model';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(CredentialModel, HOPE_COMMAND_CONNECTION)
    public repo: Repository<CredentialModel>,
  ) {}

  async getToken(): Promise<CredentialEntity> {
    const currentDate = moment(new Date());

    const oneHour = moment.duration('01:00:00');

    const dateAndtimeOneHourAgo = currentDate
      .subtract(oneHour)
      .format('YYYY-MM-DD H:i:s');

    return await this.repo
      .createQueryBuilder('cred')
      .where('cred.created_at >= :date', { date: dateAndtimeOneHourAgo })
      .orderBy('cred.id', 'ASC')
      .getOne();
  }

  async upsertToken(
    credentials: LoginResponseAuthEntity,
  ): Promise<CredentialEntity> {
    const body: CredentialEntity = {
      id: null,
      token: credentials.token,
      details: JSON.stringify(credentials),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    return await this.repo.save(body);
  }
}
