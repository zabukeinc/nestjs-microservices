import { Logger } from '@nestjs/common';

export class ConsoleLogBuilderHelper {
  private serviceName: string;
  private currentFunctionName: string;
  private url: string;
  private params: any;
  private body: any;
  private method: string;
  private request: any = null;
  private err: any = null;

  setServiceName(serviceName: string): this {
    this.serviceName = serviceName;
    return this;
  }

  setFuncName(name: string): this {
    this.currentFunctionName = name;
    return this;
  }

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  setParams(params): this {
    this.params = params;
    return this;
  }

  setBody(body): this {
    this.body = body;
    return this;
  }

  setMethod(method): this {
    this.method = method;
    return this;
  }

  setRequest(req): this {
    this.request = req;
    return this;
  }

  setErr(err): this {
    this.err = err;
    return this;
  }

  build(): void {
    const response = this.err
      ? JSON.stringify(this.err.response.data)
      : JSON.stringify(this.request.data);

    const msg = `:::${this.serviceName}::: [FUNC]: ${
      this.currentFunctionName
    } <==> [METHOD]: ${this.method} <==> [URL]: ${this.url} <==> [PARAMS]: ${
      this.params
    }<==>[BODY]: ${JSON.stringify(this.body)} <==> [RESPONSE]: ${response}`;

    if (this.err) {
      Logger.error(msg);
    } else {
      Logger.log(msg);
    }
    // const hasError = Object.keys(this.err)?.length > 0

    // const response = hasError
    //   ? JSON.stringify(this.err?.response?.data || this.err)
    //   : JSON.stringify(this.request?.data);

    //   const message = `:::${this.serviceName}::: [FUNC]: ${
    //     this.currentFunctionName
    //   } <==> [METHOD]: ${this.method} <==> [URL]: ${this.url} <==> [PARAMS]: ${
    //     this.params
    //   }<==>[BODY]: ${JSON.stringify(this.body)} <==> [RESPONSE]: ${response}`;

    //   if (this.err) {
    //     Logger.error(message);
    //   } else {
    //     Logger.log(message);
    //   }
  }
}
