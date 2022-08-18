import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/data/services/base.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/consumers/user.entity';
import { TRANSACTION_COMMAND_CONNECTION } from '../../utils/connection-name.util';
import { UserModel } from '../models/consumers/user.model';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserModel, TRANSACTION_COMMAND_CONNECTION)
    public repository: Repository<UserEntity>,
  ) {
    super(repository);
  }
}
