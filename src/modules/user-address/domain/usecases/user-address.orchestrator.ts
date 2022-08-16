import { BadRequestException, Injectable } from '@nestjs/common';
import { Pagination, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { BaseOrchestrator } from 'src/base/domain/usecases/base.orchestrator';
import { UserAddressService } from '../../data/services/user-address.service';
import { UserAddressEntity } from '../entities/user-address.entity';
import { CreateUserAddressManager } from './managers/create-user-address.manager';
import { DeleteUserAddressManager } from './managers/delete-user-address.manager';
import { UpdateUserAddressManager } from './managers/update-user-address.manager';

@Injectable()
export class UserAddressOrchestrator extends BaseOrchestrator<UserAddressEntity> {
  constructor(protected service: UserAddressService) {
    super(service);
  }

  async show(id: number): Promise<UserAddressEntity> {
    return await this.service.show(id);
  }

  async index(
    page: number,
    limit: number,
  ): Promise<Pagination<UserAddressEntity, IPaginationMeta>> {
    return await this.service.index(
      {
        page,
        limit,
        route: 'users/address',
      },
      this.service.repository.createQueryBuilder('user_address'),
    );
  }

  async create(entity: UserAddressEntity): Promise<UserAddressEntity> {
    return await new CreateUserAddressManager(this.service, entity).execute();
  }

  async update(
    id: number,
    entity: UserAddressEntity,
  ): Promise<UserAddressEntity> {
    return await new UpdateUserAddressManager(
      this.service,
      id,
      entity,
    ).execute();
  }
  async delete(id: number): Promise<string> {
    const deleted = await new DeleteUserAddressManager(
      this.service,
      id,
    ).execute();
    if (deleted) return 'User Address succesfully deleted.';
    throw new BadRequestException('Error while deleting user address.');
  }
}
