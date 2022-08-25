import { ResponseEntity } from '@base-module/helpers/response.helper';
import { BaseAxiosGetAllParamDTO } from '@base-module/infrastructure/dto/base-axios-get-all-param.dto';
import { InvoiceOrchestrator } from '@invoice-module/domain/usecases/invoice.orchestrator';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('invoices')
@ApiTags('API HOPE-MS Invoice to Jubelio')
export class InvoiceController {
  constructor(protected orchestrator: InvoiceOrchestrator) {}

  @Get()
  async getAllInvoices(
    @Query() params: BaseAxiosGetAllParamDTO,
  ): Promise<ResponseEntity> {
    return await this.orchestrator.getAllInvoices(params);
  }
}
