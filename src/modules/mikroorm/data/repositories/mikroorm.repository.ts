import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { MikroormEntity } from '../../domain/entities/mikroorm.entity';
import { MikroormModel } from '../models/mikroorm.model';

@Injectable()
export class MikroormRepository {
  constructor(
    @InjectRepository(MikroormModel)
    private repo: EntityRepository<MikroormEntity>,
  ) {}

  async create(entity: MikroormEntity): Promise<MikroormEntity> {
    const createObj = this.repo.create(entity);

    await this.repo.persistAndFlush(createObj);

    return createObj;
  }

  async getAll(page: number, limit: number): Promise<MikroormEntity[]> {
    return await this.repo.findAll({
      limit,
      offset: page,
    });
  }

  async getOne(id: number): Promise<MikroormEntity> {
    return await this.repo.findOne(id);
  }

  async update(
    id: number,
    updatedData: MikroormEntity,
  ): Promise<MikroormEntity> {
    const data = await this.getOne(id);

    Object.assign(data, updatedData);

    await this.repo.persistAndFlush(data);

    return data;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.repo.nativeDelete(id);

    return deleted > 0;
  }
}
