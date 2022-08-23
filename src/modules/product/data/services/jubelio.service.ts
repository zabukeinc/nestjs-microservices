import { BaseAxiosService } from '@base-module/data/services/base.axios.service';
import { LoginResponseAuthEntity } from 'src/modules/product/domain/entities/auth/login-response.auth.entity';
import { HttpModuleOptions, HttpService } from '@nestjs/axios';
import { HttpStatus } from '@nestjs/common';
import {
  JUBELIO_HOST,
  JUBELIO_PASSWORD,
  JUBELIO_TIMEOUT,
  JUBELIO_USER,
  JUBELIO_WEBHOOK_SECRET,
} from '@utils/global.util';
import Crypto from 'crypto';
import { CredentialService } from './credential.service';

export class BaseJubelioService extends BaseAxiosService {
  constructor(
    protected httpService: HttpService,
    protected credentialService: CredentialService,
  ) {
    super(httpService);
  }
  public url: string = JUBELIO_HOST;

  public config: HttpModuleOptions = {
    baseURL: JUBELIO_HOST,
    timeout: JUBELIO_TIMEOUT,
    headers: null,
  };

  public axiosServiceName = 'JUBELIO_SERVICE';

  public retryLimit = 5;

  async login(): Promise<HttpModuleOptions> {
    const body = { email: JUBELIO_USER, password: JUBELIO_PASSWORD };

    try {
      const credential = await this.credentialService.getToken();

      if (credential?.token) {
        Object.assign(this.config, {
          headers: { Authorization: credential.token },
        });
        return this.config;
      }

      const result = await this.post<LoginResponseAuthEntity>('/login', body);

      if (result.data.token) {
        Object.assign(this.config, {
          headers: { Authorization: result.data.token },
        });

        await this.credentialService.upsertToken(result.data);
        return this.config;
      }
    } catch (err) {
      return err;
    }
  }

  verifyWebhookSignature(body, hmac) {
    const stringHmac = JSON.stringify(body) + JUBELIO_WEBHOOK_SECRET;
    const calcHmac = Crypto.createHmac('sha256', JUBELIO_WEBHOOK_SECRET)
      .update(stringHmac)
      .digest('hex');

    return calcHmac === hmac;
  }

  createSignature(body) {
    const stringHmac = JSON.stringify(body) + JUBELIO_WEBHOOK_SECRET;
    const calcHmac = Crypto.createHmac('sha256', JUBELIO_WEBHOOK_SECRET)
      .update(stringHmac)
      .digest('hex');

    return calcHmac;
  }

  protected isUnauthorized({ status }): boolean {
    return status === HttpStatus.UNAUTHORIZED;
  }
}
