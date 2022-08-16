import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository, SelectQueryBuilder } from 'typeorm';

export class BaseService<Entity> {
  constructor(public repository: Repository<Entity>) {}

  relations = [];

  async index(
    options: IPaginationOptions,
    qb: SelectQueryBuilder<Entity>,
  ): Promise<Pagination<Entity>> {
    return paginate<Entity>(qb, options);
  }

  async show(id: number): Promise<Entity> {
    return await this.repository.findOne({
      where: { id } as any,
      relations: this.relations,
    });
  }

  async findOneOrFail(id: number): Promise<Entity | NotFoundException> {
    return await this.repository.findOneOrFail({ where: { id } as any });
  }

  async save(entity: Entity): Promise<Entity> {
    return await this.repository.save(entity);
  }

  async update(id: number, entity: Entity): Promise<Entity> {
    const updated = await this.repository.update(id, entity);

    if (updated.affected > 0) return await this.show(id);

    throw new BadRequestException('Uncaught error while updating data');
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.repository.delete(id);

    return deleted.affected > 0;
  }
}
