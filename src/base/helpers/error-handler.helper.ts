import {
  BadGatewayException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class ErrorHandler {
  catch(err: any) {
    if (err instanceof BadRequestException) {
      throw new BadRequestException(err.message);
    }

    if (err instanceof NotFoundException) {
      throw new NotFoundException(err.message);
    }

    if (err instanceof UnauthorizedException) {
      throw new UnauthorizedException(err.message);
    }

    if (err instanceof BadGatewayException) {
      throw new BadGatewayException(err.message);
    }

    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
