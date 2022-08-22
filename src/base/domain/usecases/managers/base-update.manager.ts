import { BaseService } from '../../../../base/data/services/base.service';

export abstract class BaseUpdateManager<Entity> {
  constructor(
    protected service: BaseService<Entity>,
    protected id: number,
    protected entity: Entity,
  ) {}

  protected oldData: Entity;

  async execute(): Promise<Entity> {
    this.prepareData();

    if (await this.validation()) {
      this.oldData = this.entity;

      const oldEntity = await this.service.show(this.id);

      const newEntity = Object.assign(oldEntity, this.entity);

      const updated = await this.service.save(newEntity);

      await this.afterProcess(oldEntity, updated);

      return updated;
    }
  }

  abstract prepareData(): Promise<void>;

  abstract validation(): Promise<boolean>;

  abstract afterProcess(newEntity: Entity, oldEntity: Entity): Promise<void>;
}
