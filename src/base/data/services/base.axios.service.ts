import { AxiosErrorHandlerHelper } from "@base-module/helpers/axios-error-handler.helper";
import { ResponseEntity, Responses } from "@base-module/helpers/response.helper";
import { HttpService, HttpModuleOptions } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { lastValueFrom } from "rxjs";

@Injectable()
export class BaseAxiosService {
  constructor(protected readonly httpService: HttpService) { }

  protected readonly responses = new Responses();

  protected readonly errorHandler = new AxiosErrorHandlerHelper();

  public url: string;
  public config: HttpModuleOptions;

  setConfig(config: HttpModuleOptions): this {
    this.config = config;

    return this;
  }

  setBaseUrl(url: string): this {
    this.url = url;

    return this;
  }

  async get(params = ''): Promise<ResponseEntity> {
    if (params !== '') params = this.makeParam(params);

    try {
      const request = await lastValueFrom(
        this.httpService.get(`${this.url}${params}`, this.config)
      );

      return this.responses.json(request.status, request.data);
    } catch (err) {
      const { data } = err;
      return this.responses.json(data.statusCode, null,)
    }
  }

  async post(url, body): Promise<ResponseEntity> {
    try {
      const request = await lastValueFrom(
        this.httpService.post(url, body, this.config)
      );

      this.produceLog(url, null, body, 'POST', request);
      return this.responses.json(request.status, request.data);
    } catch (err) {
      this.produceLog(url, null, body, 'POST', null, err);
      this.errorHandler.catch(err.response.data);
    }
  }

  async put(id, body): Promise<ResponseEntity> {
    try {
      const request = await lastValueFrom(
        this.httpService.put(`${this.url}/${id}`, body, this.config)
      );

      return this.responses.json(request.status, request.data);
    } catch (err) {
      return err;
    }
  }

  async delete(id): Promise<ResponseEntity> {
    try {
      const request = await lastValueFrom(
        this.httpService.delete(`${this.url}/${id}`, this.config)
      )

      return this.responses.json(request.status, request.data);
    } catch (err) {
      return err;
    }
  }

  protected produceLog(url = null, params = null, body = null, method, request = null, err = null): void {
    if (err) {
      Logger.error(
        `[METHOD]: ${method} || [URL]: ${url} || [PARAMS]: ${params}||[BODY]: ${JSON.stringify(body)} || [RESPONSE]: ${JSON.stringify(err.response.data)}`
      );
    } else {
      Logger.log(
        `[METHOD]: ${method} || [URL]: ${url} || [PARAMS]: ${params}||[BODY]: ${JSON.stringify(body)} || [RESPONSE]: ${JSON.stringify(request.data)}`
      );
    }
  }

  protected makeParam(objParam): string {
    let result = ''

    const arrArgs = Object.keys(objParam)

    const noValue = (val): boolean => {
      const availableTypes = ['boolean', 'number']
      return !val && !availableTypes.includes(typeof val)
    }

    arrArgs.forEach((x, y) => {
      result += y < 1 ? '?' : ''
      const val = objParam[x]
      if (noValue(val)) return
      else if (Array.isArray(val)) {
        if (!val.length) return
        val.forEach((a, b) => {
          result += `${x}[${b}]=${a}`
          result += b < val.length - 1 ? '&' : ''
        })
      } else result += `${x}=${val}`
      result += y < arrArgs.length - 1 ? '&' : ''
    })

    return result
  }
}