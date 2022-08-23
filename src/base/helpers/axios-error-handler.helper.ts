import {
  BadGatewayException,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
export interface AxiosResponseDataEntity {
  statusCode: number;
  error: string;
  message: string;
  code: string;
}

export class AxiosErrorHandlerHelper {
  catch(data: AxiosResponseDataEntity) {
    const { statusCode, code } = data;

    switch (statusCode) {
      case 500:
        throw new InternalServerErrorException(code);
      case 401:
        throw new UnauthorizedException(code);
      case 404:
        throw new NotFoundException(code);
      case 400:
        throw new BadRequestException(code);
      case 502:
        throw new BadGatewayException(code);
      default:
        throw new Error(code);
    }
  }
}
