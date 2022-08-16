import { BaseDeleteManager } from 'src/base/domain/usecases/managers/base-delete.manager';
import { UserAddressService } from 'src/modules/user-address/data/services/user-address.service';
import { UserAddressEntity } from '../../entities/user-address.entity';

export class DeleteUserAddressManager extends BaseDeleteManager<UserAddressEntity> {
  constructor(protected service: UserAddressService, protected id: number) {
    super(service, id);
  }

  async validation(): Promise<boolean> {
    return true;
  }

  async afterProcess(entity: string | number): Promise<void> {
    console.log('after process delete user address', !!entity);
    return;
  }
}
