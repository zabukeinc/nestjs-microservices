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
import { UserEntity } from '../../domain/entities/user.entity';
import { UserOrchestrator } from '../../domain/usecases/user.orchestrator';
import { UserPinDTO } from '../dto/user-pin.dto';
import { UserDTO } from '../dto/user.dto';

@Controller('users')
@ApiTags('API Users')
export class UserController extends BaseController<UserEntity> {
  constructor(public orchestrator: UserOrchestrator) {
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
  async create(@Body() entity: UserDTO): Promise<ResponseEntity> {
    try {
      const data = await this.orchestrator.create(entity);
      return this.responses.json(HttpStatus.CREATED, data);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }

  @Post('pin')
  async createPin(@Body() entity: UserPinDTO): Promise<ResponseEntity> {
    try {
      const data = await this.orchestrator.addPin(entity);
      const resultMessage = data
        ? 'Pin added succesfully.'
        : 'Failed to add pin.';
      return this.responses.json(HttpStatus.CREATED, resultMessage);
    } catch (err) {
      this.errorHandler.catch(err);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() entity: UserDTO,
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
