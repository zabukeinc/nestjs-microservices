import { BaseLogEntity } from '@base-module/domain/entities/base-log.entity';
import { BaseLogProducer } from '@base-module/infrastructure/producers/base-log.producer';
import { ResponseEntity } from './response.helper';

export class LogPayloadBuilderHelper {
  constructor(private producer: BaseLogProducer) {}

  private action: string;
  private endpoint: string;
  private response: ResponseEntity;
  private request: any;

  /**
   *
   * @param action HTTP METHOD
   * @returns
   */
  setAction(action: string): this {
    this.action = action;

    return this;
  }

  /**
   *
   * @param endpoint API Endpoint
   * @returns
   */
  setEndpoint(endpoint: string): this {
    this.endpoint = endpoint;

    return this;
  }

  /**
   *
   * @param response Result Response of Request
   * @returns
   */
  setResponse(response: ResponseEntity): this {
    this.response = response;
    return this;
  }

  /**
   *
   * @param req Request Body
   * @returns
   */
  setRequest(req: any): this {
    this.request = req;

    return this;
  }

  protected transform(): BaseLogEntity {
    return {
      action: this.action,
      request: JSON.stringify(this.request || {}),
      response: JSON.stringify(this.response || {}),
      status_code: this.response.status,
      endpoint: this.endpoint,
    };
  }

  /**
   * Produce message
   */
  async produce(): Promise<void> {
    const payload = this.transform();

    await this.producer.produceRequest(payload);
  }
}
