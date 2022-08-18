import { TransactionService } from 'src/modules/user/data/services/consumers/transaction.service';
import { UserService } from 'src/modules/user/data/services/user.service';
import { TransactionEntity } from 'src/modules/user/domain/entities/consumers/transaction.entity';

export class TransactionCreatedManager {
  constructor(
    protected service: TransactionService,
    protected userService: UserService,
    protected payload: any,
  ) {}

  async execute(): Promise<void> {
    const user = await this.userService.show(this.payload.user_id);

    if (!user) return;

    await this.service.save(this.transform());
  }

  protected transform(): TransactionEntity {
    return {
      id: this.payload.id,
      date: this.payload.date,
      items: JSON.stringify(this.payload.items),
      total: this.payload.total,
      total_quantity: this.getTotalQuantities(),
      user_id: this.payload.user_id,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
  }

  protected getTotalQuantities(): number {
    return this.payload.items.reduce((total: number, item) => {
      return (total += parseInt(item.quantity) || 0);
    }, 0);
  }
}
