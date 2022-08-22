import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../../base/data/services/base.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { USER_COMMAND_CONNECTION } from '../../utils/connection-name.util';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserModel, USER_COMMAND_CONNECTION)
    public repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  relations = ['user_pin', 'user_addresses', 'transactions'];

  async addPin(entity: UserEntity): Promise<UserEntity> {
    return await this.repository.save(entity);
  }
}
