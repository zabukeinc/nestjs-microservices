import { AccountService } from '@account-module/data/services/account.service';
import { BaseAxiosGetAllParam } from '@base-module/domain/entities/base-axios-get-all-param.entity';
import { ResponseEntity } from '@base-module/helpers/response.helper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountOrchestrator {
  constructor(protected service: AccountService) {}

  async getAccountInformation(): Promise<ResponseEntity> {
    return await this.service.getAccountInformation();
  }

  async getLocations(params: BaseAxiosGetAllParam): Promise<ResponseEntity> {
    return await this.service.getLocations(params);
  }
}
