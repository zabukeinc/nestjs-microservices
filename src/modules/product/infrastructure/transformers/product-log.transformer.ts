import { ResponseEntity } from '@base-module/helpers/response.helper';
import { ProductLogEntity } from '@product-module/domain/entities/log/product-log.entity';

export class ProductLogTransformer {
  transform(
    action: string,
    request: any,
    data: ResponseEntity,
  ): ProductLogEntity {
    return {
      id: null,
      action,
      request: JSON.stringify(request),
      response: JSON.stringify(data.data),
      status_code: data.status,
      order_id: data?.data?.order_id,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
  }
}
