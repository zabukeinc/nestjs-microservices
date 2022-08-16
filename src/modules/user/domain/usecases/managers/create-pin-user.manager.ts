import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/modules/user/data/services/user.service';
import { UserProducer } from 'src/modules/user/infrastructure/producers/user.producer';
import { UserPinEntity } from '../../entities/user-pin.entity';
import { UserEntity } from '../../entities/user.entity';

export class CreatePinUserManager {
  constructor(
    protected service: UserService,
    protected producer: UserProducer,
    protected entity: UserPinEntity,
  ) {}

  async execute(): Promise<UserEntity> {
    const user = await this.service.show(this.entity.user_id);

    if (!user)
      throw new NotFoundException(
        `User with id ${this.entity.user_id} is not found.`,
      );

    if (user.user_pin.pin)
      throw new BadRequestException('User already set the pin.');

    const pinObj = {
      pin: this.entity.pin,
      user_id: user.id,
    };

    Object.assign(user, { user_pin: pinObj });

    const updated = await this.service.save(user);

    if (!updated)
      throw new BadRequestException('Error while adding pin to user.');

    await this.producer.changed(updated, user);

    return updated;
  }
}
