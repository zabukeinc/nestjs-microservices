import { AccountOrchestrator } from '@account-module/domain/usecases/account.orchestrator';
import { ResponseEntity } from '@base-module/helpers/response.helper';
import { BaseAxiosGetAllParamDTO } from '@base-module/infrastructure/dto/base-axios-get-all-param.dto';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('accounts')
@ApiTags('API HOPE-MS Account to Jubelio')
export class AccountController {
  constructor(protected orchestrator: AccountOrchestrator) {}

  @Get('my-account')
  async getAccountInformation(): Promise<ResponseEntity> {
    try {
      return await this.orchestrator.getAccountInformation();
    } catch (err) {
      return err;
    }
  }

  @Get('locations')
  async getLocations(
    @Param() params: BaseAxiosGetAllParamDTO,
  ): Promise<ResponseEntity> {
    try {
      return await this.orchestrator.getLocations(params);
    } catch (err) {
      return err;
    }
  }
}
