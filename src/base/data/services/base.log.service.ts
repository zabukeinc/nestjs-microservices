import { ResponseEntity } from '@base-module/helpers/response.helper';
import { Repository } from 'typeorm';

export abstract class BaseLogService<Entity> {
  constructor(public repository: Repository<Entity>) {}

  async insertLog(
    action: string,
    response: ResponseEntity,
    request: any,
  ): Promise<void> {
    const entity = this.transform(action, response, request);

    await this.repository.save(entity);
  }

  abstract transform(
    action: string,
    response: ResponseEntity,
    request: any,
  ): Entity;
}
