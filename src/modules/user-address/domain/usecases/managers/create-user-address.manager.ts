import { BaseCreateManager } from 'src/base/domain/usecases/managers/base-create.manager';
import { UserAddressService } from 'src/modules/user-address/data/services/user-address.service';
import { UserAddressEntity } from '../../entities/user-address.entity';

export class CreateUserAddressManager extends BaseCreateManager<UserAddressEntity> {
  constructor(
    protected service: UserAddressService,
    protected entity: UserAddressEntity,
  ) {
    super(service, entity);
  }

  async prepareData(): Promise<void> {
    return;
  }

  async validation(): Promise<boolean> {
    return true;
  }

  async afterProcess(entity: UserAddressEntity): Promise<void> {
    console.log('after process create user address', !!entity);
    return;
  }
}
