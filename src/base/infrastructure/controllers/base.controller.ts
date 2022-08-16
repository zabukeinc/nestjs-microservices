import { BaseOrchestrator } from 'src/base/domain/usecases/base.orchestrator';
import { ErrorHandler } from 'src/base/helpers/error-handler.helper';
import { ResponseEntity, Responses } from 'src/base/helpers/response.helper';

export abstract class BaseController<Entity> {
  constructor(protected orchestrator: BaseOrchestrator<Entity>) {}

  responses = new Responses();
  errorHandler = new ErrorHandler();

  abstract index(page: number, limit: number): Promise<ResponseEntity>;
  abstract show(id: number): Promise<ResponseEntity>;
  abstract create(entity: Entity): Promise<ResponseEntity>;
  abstract update(id: number, entity: Entity): Promise<ResponseEntity>;
  abstract delete(id: number): Promise<ResponseEntity>;
}
