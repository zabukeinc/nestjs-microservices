import { BadRequestException, Injectable } from '@nestjs/common';
import { Pagination, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { BaseOrchestrator } from 'src/base/domain/usecases/base.orchestrator';
import { UserService } from '../../data/services/user.service';
import { UserProducer } from '../../infrastructure/producers/user.producer';
import { UserPinEntity } from '../entities/user-pin.entity';
import { UserEntity } from '../entities/user.entity';
import { CreatePinUserManager } from './managers/create-pin-user.manager';
import { CreateUserManager } from './managers/create-user.manager';
import { DeleteUserManager } from './managers/delete-user.manager';
import { UpdateUserManager } from './managers/update-user.manager';

@Injectable()
export class UserOrchestrator extends BaseOrchestrator<UserEntity> {
  constructor(
    protected service: UserService,
    protected producer: UserProducer,
  ) {
    super(service);
  }

  async show(id: number): Promise<UserEntity> {
    return await this.service.show(id);
  }

  async index(
    page: number,
    limit: number,
  ): Promise<Pagination<UserEntity, IPaginationMeta>> {
    return await this.service.index(
      {
        page,
        limit,
        route: 'users',
      },
      this.service.repository.createQueryBuilder('user'),
    );
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    return await new CreateUserManager(
      this.service,
      this.producer,
      entity,
    ).execute();
  }

  async update(id: number, entity: UserEntity): Promise<UserEntity> {
    return await new UpdateUserManager(
      this.service,
      this.producer,
      id,
      entity,
    ).execute();
  }

  async delete(id: number): Promise<string> {
    const deleted = await new DeleteUserManager(
      this.service,
      this.producer,
      id,
    ).execute();

    if (deleted) return 'Succesfully deleted';
    throw new BadRequestException('Error while deleting data');
  }

  async addPin(entity: UserPinEntity): Promise<boolean> {
    const data = await new CreatePinUserManager(
      this.service,
      this.producer,
      entity,
    ).execute();

    return !!data;
  }
}
