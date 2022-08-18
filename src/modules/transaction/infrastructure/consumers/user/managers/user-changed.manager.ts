import { UserService } from 'src/modules/transaction/data/services/user.service';

export class UserChangedManager {
  constructor(protected service: UserService, protected payload: any) {}

  async execute(): Promise<void> {
    const data = {
      id: this.payload.old.id,
      ...this.payload.new,
    };
    await this.service.save(data);
  }
}
