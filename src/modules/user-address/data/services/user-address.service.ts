import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/data/services/base.service';
import { USER_COMMAND_CONNECTION } from 'src/modules/user/utils/connection-name.util';
import { Repository } from 'typeorm';
import { UserAddressEntity } from '../../domain/entities/user-address.entity';
import { UserAddressModel } from '../models/user-address.model';

@Injectable()
export class UserAddressService extends BaseService<UserAddressEntity> {
  constructor(
    @InjectRepository(UserAddressModel, USER_COMMAND_CONNECTION)
    public repository: Repository<UserAddressEntity>,
  ) {
    super(repository);
  }
}
