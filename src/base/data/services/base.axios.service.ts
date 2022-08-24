import { AxiosErrorHandlerHelper } from '@base-module/helpers/axios-error-handler.helper';
import { ConsoleLogBuilderHelper } from '@base-module/helpers/console-log-builder.helper';
import { makeGetParam } from '@base-module/helpers/make-get-param.helper';
import {
  ResponseEntity,
  Responses,
} from '@base-module/helpers/response.helper';
import { HttpService, HttpModuleOptions } from '@nestjs/axios';
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
    params = params ? makeGetParam(params) : '';

    try {
      const request = await lastValueFrom(
        this.httpService.get(`${endpoint}${params}`, this.config),
      );

      new ConsoleLogBuilderHelper()
        .setServiceName(this.axiosServiceName)
        .setMethod('GET')
        .setUrl(`${this.url}${endpoint}${params}`)
        .setParams(params)
        .setFuncName(this.currentFunctionName)
        .setRequest(request)
        .build();

      return this.responses.json(request.status, request.data as Entity);
    } catch (err) {
      new ConsoleLogBuilderHelper()
        .setServiceName(this.axiosServiceName)
        .setMethod('GET')
        .setUrl(`${this.url}${endpoint}${params}`)
        .setParams(params)
        .setFuncName(this.currentFunctionName)
        .setErr(err)
        .build();

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

      new ConsoleLogBuilderHelper()
        .setServiceName(this.axiosServiceName)
        .setMethod('POST')
        .setUrl(`${this.url}${endpoint}`)
        .setBody(body)
        .setFuncName(this.currentFunctionName)
        .setRequest(request)
        .build();

      return this.responses.json(request.status, request.data as Entity);
    } catch (err) {
      new ConsoleLogBuilderHelper()
        .setServiceName(this.axiosServiceName)
        .setMethod('POST')
        .setUrl(`${this.url}${endpoint}`)
        .setBody(body)
        .setFuncName(this.currentFunctionName)
        .setErr(err)
        .build();

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

      new ConsoleLogBuilderHelper()
        .setServiceName(this.axiosServiceName)
        .setMethod('PUT')
        .setUrl(`${this.url}${endpoint}/${id}`)
        .setBody(body)
        .setFuncName(this.currentFunctionName)
        .setRequest(request)
        .build();

      return this.responses.json(request.status, request.data as Entity);
    } catch (err) {
      new ConsoleLogBuilderHelper()
        .setServiceName(this.axiosServiceName)
        .setMethod('PUT')
        .setUrl(`${this.url}${endpoint}`)
        .setBody(body)
        .setFuncName(this.currentFunctionName)
        .setErr(err)
        .build();

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

      new ConsoleLogBuilderHelper()
        .setServiceName(this.axiosServiceName)
        .setMethod('DELETE')
        .setUrl(`${this.url}${endpoint}/${id}`)
        .setFuncName(this.currentFunctionName)
        .setRequest(request)
        .build();

      return this.responses.json(request.status, request.data);
    } catch (err) {
      new ConsoleLogBuilderHelper()
        .setServiceName(this.axiosServiceName)
        .setMethod('DELETE')
        .setUrl(`${this.url}${endpoint}/${id}`)
        .setFuncName(this.currentFunctionName)
        .setErr(err)
        .build();

      return this.responses.json(
        err.response.data.statusCode,
        null,
        err.response.data.message,
      );
    }
  }
}
