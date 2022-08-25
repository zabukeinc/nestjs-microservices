import { BaseAxiosGetAllParam } from '@base-module/domain/entities/base-axios-get-all-param.entity';
import { ResponseEntity } from '@base-module/helpers/response.helper';
import { InvoiceService } from '@invoice-module/data/services/invoice.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoiceOrchestrator {
  constructor(protected service: InvoiceService) {}

  async getAllInvoices(params: BaseAxiosGetAllParam): Promise<ResponseEntity> {
    return await this.service.getAllInvoices(params);
  }
}
