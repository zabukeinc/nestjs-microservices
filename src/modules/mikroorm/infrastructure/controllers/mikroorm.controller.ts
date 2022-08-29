import { ErrorHandler } from '@base-module/helpers/error-handler.helper';
import {
  ResponseEntity,
  Responses,
} from '@base-module/helpers/response.helper';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MikroormOrchestrator } from '../../domain/usecases/mikroorm.orchestrator';
import { CreateMikroormDTO } from '../dto/create-mikroorm.dto';

@Controller('mikroorm')
@ApiTags('Testing CRUD with Mikroorm')
export class MikroormController {
  constructor(protected orchestrator: MikroormOrchestrator) {}

  protected responses = new Responses();
  protected errorHandler = new ErrorHandler();

  @Get()
  async index(
    @Query() page: number,
    @Query() limit: number,
  ): Promise<ResponseEntity> {
    try {
      const datas = await this.orchestrator.getAll(page, limit);
      return this.responses.json(HttpStatus.OK, datas);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<ResponseEntity> {
    try {
      const data = await this.orchestrator.getOne(id);
      return this.responses.json(HttpStatus.OK, data);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }

  @Post()
  async create(@Body() entity: CreateMikroormDTO): Promise<ResponseEntity> {
    try {
      const data = await this.orchestrator.create(entity);

      return this.responses.json(HttpStatus.CREATED, data);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() entity: CreateMikroormDTO,
  ): Promise<ResponseEntity> {
    try {
      const data = await this.orchestrator.update(id, entity);

      return this.responses.json(HttpStatus.OK, data);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ResponseEntity> {
    try {
      await this.orchestrator.delete(id);

      return this.responses.json(HttpStatus.NO_CONTENT, null);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }
}
