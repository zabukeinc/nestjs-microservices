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
import { UserAddressEntity } from '../../domain/entities/user-address.entity';
import { UserAddressOrchestrator } from '../../domain/usecases/user-address.orchestrator';
import { UserAddressDTO } from '../dto/user-address.dto';

@Controller('users/address')
@ApiTags('API User Addresses')
export class UserAddressController extends BaseController<UserAddressEntity> {
  constructor(protected orchestrator: UserAddressOrchestrator) {
    super(orchestrator);
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

  @Get()
  async index(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ResponseEntity> {
    try {
      const datas = await this.orchestrator.index(page, limit);
      return this.responses.json(HttpStatus.OK, datas);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }

  @Post()
  async create(@Body() entity: UserAddressDTO): Promise<ResponseEntity> {
    try {
      const data = await this.orchestrator.create(entity);
      return this.responses.json(HttpStatus.OK, data);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() entity: UserAddressEntity,
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
      return this.responses.json(HttpStatus.OK, data);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }
}
