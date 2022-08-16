import { NotFoundException } from '@nestjs/common';
import { BaseDeleteManager } from 'src/base/domain/usecases/managers/base-delete.manager';
import { UserService } from 'src/modules/user/data/services/user.service';
import { UserProducer } from 'src/modules/user/infrastructure/producers/user.producer';
import { UserEntity } from '../../entities/user.entity';

export class DeleteUserManager extends BaseDeleteManager<UserEntity> {
  constructor(
    protected service: UserService,
    protected producer: UserProducer,
    protected id: number,
  ) {
    super(service, id);
  }

  async prepareData(): Promise<void> {
    return;
  }

  async validation(): Promise<boolean> {
    const existing = await this.service.show(this.id);

    if (!existing)
      throw new NotFoundException(`User with id ${this.id} doesn't exist.`);

    return true;
  }

  async afterProcess(entity: string | number): Promise<void> {
    await this.producer.deleted(entity);
  }
}
