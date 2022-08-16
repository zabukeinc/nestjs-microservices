import { BaseService } from 'src/base/data/services/base.service';

export abstract class BaseDeleteManager<Entity> {
  constructor(protected service: BaseService<Entity>, protected id: number) {}

  async execute(): Promise<boolean> {
    const validation = await this.validation();

    if (!validation) return false;

    const deleted = await this.service.delete(this.id);

    if (deleted) await this.afterProcess(this.id);

    return !!deleted;
  }

  abstract validation(): Promise<boolean>;

  abstract afterProcess(entity: string | number): Promise<void>;
}
