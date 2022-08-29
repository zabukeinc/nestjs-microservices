import { Injectable } from '@nestjs/common';
import { MikroormRepository } from '../../data/repositories/mikroorm.repository';
import { MikroormEntity } from '../entities/mikroorm.entity';

@Injectable()
export class MikroormOrchestrator {
  constructor(protected repository: MikroormRepository) {}

  async getAll(page: number, limit: number): Promise<MikroormEntity[]> {
    return await this.repository.getAll(page, limit);
  }

  async getOne(id: number): Promise<MikroormEntity> {
    return await this.repository.getOne(id);
  }

  async create(entity: MikroormEntity): Promise<MikroormEntity> {
    return await this.repository.create(entity);
  }

  async update(id: number, entity: MikroormEntity): Promise<MikroormEntity> {
    return await this.repository.update(id, entity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
