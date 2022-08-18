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
import { ResponseEntity } from 'src/base/helpers/response.helper';
import { BaseController } from 'src/base/infrastructure/controllers/base.controller';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TransactionOrchestrator } from '../../domain/usecases/transaction.orchestrator';
import { TransactionDTO } from '../dto/transaction.dto';

@Controller('transactions')
@ApiTags('API transaction')
export class TransactionController extends BaseController<TransactionEntity> {
  constructor(public orchestrator: TransactionOrchestrator) {
    super(orchestrator);
  }

  @Get()
  async index(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ResponseEntity> {
    try {
      const data = await this.orchestrator.index(page, limit);
      return this.responses.json(HttpStatus.OK, data);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<ResponseEntity> {
    try {
      const data = await this.orchestrator.show(id);

      return this.responses.json(HttpStatus.OK, data);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }

  @Post()
  async create(@Body() entity: TransactionDTO): Promise<ResponseEntity> {
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
    @Body() entity: TransactionDTO,
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
      const data = await this.orchestrator.delete(id);

      return this.responses.json(HttpStatus.NO_CONTENT, data);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }
}
