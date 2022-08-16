import { BaseUpdateManager } from 'src/base/domain/usecases/managers/base-update.manager';
import { UserService } from 'src/modules/user/data/services/user.service';
import { UserProducer } from 'src/modules/user/infrastructure/producers/user.producer';
import { UserEntity } from '../../entities/user.entity';

export class UpdateUserManager extends BaseUpdateManager<UserEntity> {
  constructor(
    protected service: UserService,
    protected producer: UserProducer,
    protected id: number,
    protected entity: UserEntity,
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
    newEntity: UserEntity,
    oldEntity: UserEntity,
  ): Promise<void> {
    await this.producer.changed(newEntity, oldEntity);
  }
}
