import { TransactionService } from "src/modules/user/data/services/consumers/transaction.service";
import { TransactionEntity } from "src/modules/user/domain/entities/consumers/transaction.entity";

export class TransactionChangedManager {
  constructor(
    protected service: TransactionService,
    protected payload: any
  ) {}

  async execute(): Promise<void> {
    await this.service.save(
      this.transform()
    );
  }

  protected transform(): TransactionEntity {
    return {
      id: this.payload.old.id,
      date: this.payload.new.date,
      items: this.payload.new.items,
      total: this.payload.new.total,
      total_quantity: this.getTotalQuantities(),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    }
  }

  protected getTotalQuantities(): number {
    return this.payload.new.items.reduce((total: number, item) => {
      return total += (parseInt(item.quantity) || 0);
    }, 0);
  }
}