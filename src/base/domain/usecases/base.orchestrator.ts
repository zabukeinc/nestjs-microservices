import { Pagination } from 'nestjs-typeorm-paginate';
import { BaseService } from '../../../base/data/services/base.service';

export abstract class BaseOrchestrator<Entity> {
  constructor(protected service: BaseService<Entity>) {}

  abstract show(id: number): Promise<Entity>;
  abstract index(page: number, limit: number): Promise<Pagination<Entity>>;
  abstract create(entity: Entity): Promise<Entity>;
  abstract update(id: number, entity: Entity): Promise<Entity>;
  abstract delete(id: number): Promise<string>;
}
