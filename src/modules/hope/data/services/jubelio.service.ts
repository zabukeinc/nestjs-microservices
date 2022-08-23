import { BaseAxiosService } from "@base-module/data/services/base.axios.service";
import { ResponseEntity } from "@base-module/helpers/response.helper";
import { HttpModuleOptions, HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { JUBELIO_HOST, JUBELIO_PASSWORD, JUBELIO_TIMEOUT, JUBELIO_USER } from "@utils/global.util";

@Injectable()
export class JubelioService extends BaseAxiosService {
  constructor(protected httpService: HttpService) {
    super(httpService);
  }
  public url: string = JUBELIO_HOST;

  public config: HttpModuleOptions = {
    baseURL: JUBELIO_HOST,
    timeout: JUBELIO_TIMEOUT
  };

  async login(): Promise<ResponseEntity> {
    const body = { email: JUBELIO_USER, password: JUBELIO_PASSWORD };

    return await this.post('/login', body);
  }
}