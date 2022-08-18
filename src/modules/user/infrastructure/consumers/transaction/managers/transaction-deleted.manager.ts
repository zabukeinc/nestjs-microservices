import { TransactionService } from "src/modules/user/data/services/consumers/transaction.service";

export class TransactionDeletedManager {
  constructor(
    protected service: TransactionService,
    protected payload: any
  ) {}

  async execute(): Promise<void> {
    await this.service.delete(this.payload.id);
  }
}