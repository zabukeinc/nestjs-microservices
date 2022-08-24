import { AccountLogEntity } from '@account-log-module/domain/entities/account-log.entity';
import { BaseService } from '@base-module/data/services/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LOG_CONNECTION_NAME } from 'src/modules/connection-name';
import { Repository } from 'typeorm';
import { AccountLogModel } from '../models/account-log.model';

@Injectable()
export class AccountLogService extends BaseService<AccountLogEntity> {
  constructor(
    @InjectRepository(AccountLogModel, LOG_CONNECTION_NAME)
    private repo: Repository<AccountLogEntity>,
  ) {
    super(repo);
  }
}
