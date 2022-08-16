import { BaseUpdateManager } from 'src/base/domain/usecases/managers/base-update.manager';
import { UserAddressService } from 'src/modules/user-address/data/services/user-address.service';
import { UserAddressEntity } from '../../entities/user-address.entity';

export class UpdateUserAddressManager extends BaseUpdateManager<UserAddressEntity> {
  constructor(
    protected service: UserAddressService,
    protected id: number,
    protected entity: UserAddressEntity,
  ) {
    super(service, id, entity);
  }

  async prepareData(): Promise<void> {
    return;
  }

  async validation(): Promise<boolean> {
    return true;
  }

  async afterProcess(
    newEntity: UserAddressEntity,
    oldEntity: UserAddressEntity,
  ): Promise<void> {
    console.log('after process update user address', newEntity && oldEntity);
    return;
  }
}
