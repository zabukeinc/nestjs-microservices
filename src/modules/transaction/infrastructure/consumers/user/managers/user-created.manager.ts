import { UserService } from "src/modules/transaction/data/services/user.service";
import { UserEntity } from "src/modules/transaction/domain/entities/consumers/user.entity";

export class UserCreatedManager {
  constructor(
    protected service: UserService,
    protected payload: UserEntity
  ) {}

  async execute(): Promise<void> {
    await this.service.save(this.payload);
    console.log("Saved user");
  }
}