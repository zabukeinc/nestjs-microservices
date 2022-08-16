import { HttpStatus } from '@nestjs/common';

export interface ResponseEntity {
  status: HttpStatus;
  data?: any;
  error?: any;
}

export class Responses {
  json(status: HttpStatus, data: any, error = null): ResponseEntity {
    return { status, data, error };
  }
}
