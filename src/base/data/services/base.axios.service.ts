import { AxiosErrorHandlerHelper } from '@base-module/helpers/axios-error-handler.helper';
import {
  ResponseEntity,
  Responses,
} from '@base-module/helpers/response.helper';
import { HttpService, HttpModuleOptions } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export class BaseAxiosService {
  constructor(protected readonly httpService: HttpService) {}

  protected readonly responses = new Responses();

  protected readonly errorHandler = new AxiosErrorHandlerHelper();

  public url: string;
  public config: HttpModuleOptions;
  public axiosServiceName = 'AXIOS_SERVICE_DEFAULT';
  public currentFunctionName = 'FUNCTION_DEFAULT';

  async get<Entity>(endpoint: string, params = null): Promise<ResponseEntity> {
    params = params ? this.makeParam(params) : '';

    try {
      const request = await lastValueFrom(
        this.httpService.get(`${endpoint}${params}`, this.config),
      );
      this.produceLog(
        `${this.url}${endpoint}${params}`,
        params,
        null,
        'GET',
        request,
      );
      return this.responses.json(request.status, request.data as Entity);
    } catch (err) {
      this.produceLog(
        `${this.url}${endpoint}${params}`,
        params,
        null,
        'GET',
        null,
        err,
      );
      return this.responses.json(
        err.response.data.statusCode,
        null,
        err.response.data.message,
      );
    }
  }

  async post<Entity>(endpoint: string, body): Promise<ResponseEntity> {
    try {
      const request = await lastValueFrom(
        this.httpService.post(endpoint, body, this.config),
      );

      this.produceLog(`${this.url}${endpoint}`, null, body, 'POST', request);
      return this.responses.json(request.status, request.data as Entity);
    } catch (err) {
      this.produceLog(`${this.url}${endpoint}`, null, body, 'POST', null, err);
      return this.responses.json(
        err.response.data.statusCode,
        null,
        err.response.data.message,
      );
    }
  }

  async put<Entity>(
    endpoint: string,
    id,
    body: Entity,
  ): Promise<ResponseEntity> {
    try {
      const request = await lastValueFrom(
        this.httpService.put(`${endpoint}/${id}`, body, this.config),
      );
      this.produceLog(
        `${this.url}${endpoint}${id}`,
        null,
        body,
        'PUT',
        request,
      );
      return this.responses.json(request.status, request.data as Entity);
    } catch (err) {
      this.produceLog(
        `${this.url}${endpoint}${id}`,
        null,
        body,
        'PUT',
        null,
        err,
      );
      return this.responses.json(
        err.response.data.statusCode,
        null,
        err.response.data.message,
      );
    }
  }

  async delete(endpoint: string, id): Promise<ResponseEntity> {
    try {
      const request = await lastValueFrom(
        this.httpService.delete(`${endpoint}/${id}`, this.config),
      );
      this.produceLog(
        `${this.url}/${endpoint}/${id}`,
        null,
        null,
        'DELETE',
        request,
      );
      return this.responses.json(request.status, request.data);
    } catch (err) {
      this.produceLog(
        `${this.url}/${endpoint}/${id}`,
        null,
        null,
        'DELETE',
        null,
        err,
      );
      return this.responses.json(
        err.response.data.statusCode,
        null,
        err.response.data.message,
      );
    }
  }

  protected produceLog(
    url = null,
    params = null,
    body = null,
    method,
    request = null,
    err = null,
  ): void {
    if (err) {
      Logger.error(
        `:::${this.axiosServiceName}::: [FUNC]: ${
          this.currentFunctionName
        } <==> [METHOD]: ${method} <==> [URL]: ${url} <==> [PARAMS]: ${params}<==>[BODY]: ${JSON.stringify(
          body,
        )} <==> [RESPONSE]: ${JSON.stringify(err.response.data)}`,
      );
    } else {
      Logger.log(
        `:::${this.axiosServiceName}::: [FUNC]: ${
          this.currentFunctionName
        } <==> [METHOD]: ${method} <==> [URL]: ${url} <==> [PARAMS]: ${params}<==>[BODY]: ${JSON.stringify(
          body,
        )} <==> [RESPONSE]: ${JSON.stringify(request.data)}`,
      );
    }
  }

  protected makeParam(objParam): string {
    let result = '';

    const arrArgs = Object.keys(objParam);

    const noValue = (val): boolean => {
      const availableTypes = ['boolean', 'number'];
      return !val && !availableTypes.includes(typeof val);
    };

    arrArgs.forEach((x, y) => {
      result += y < 1 ? '?' : '';
      const val = objParam[x];
      if (noValue(val)) return;
      else if (Array.isArray(val)) {
        if (!val.length) return;
        val.forEach((a, b) => {
          result += `${x}[${b}]=${a}`;
          result += b < val.length - 1 ? '&' : '';
        });
      } else result += `${x}=${val}`;
      result += y < arrArgs.length - 1 ? '&' : '';
    });

    return result;
  }
}
