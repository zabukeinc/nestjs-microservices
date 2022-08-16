import { BaseService } from 'src/base/data/services/base.service';

export abstract class BaseCreateManager<Entity> {
  constructor(
    protected service: BaseService<Entity>,
    protected entity: Entity,
  ) {}

  async execute(): Promise<Entity> {
    await this.prepareData();

    if (await this.validation()) {
      const saved = await this.service.save(this.entity);

      await this.afterProcess(saved);

      return saved;
    }
  }

  abstract prepareData(): Promise<void>;

  abstract validation(): Promise<boolean>;

  abstract afterProcess(entity: Entity): Promise<void>;
}
