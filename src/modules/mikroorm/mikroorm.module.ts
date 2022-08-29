import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MikroormModel } from './data/models/mikroorm.model';
import { MikroormRepository } from './data/repositories/mikroorm.repository';
import { MikroormOrchestrator } from './domain/usecases/mikroorm.orchestrator';
import { MikroormController } from './infrastructure/controllers/mikroorm.controller';
@Module({
  imports: [MikroOrmModule.forFeature([MikroormModel])],
  controllers: [MikroormController],
  providers: [MikroormRepository, MikroormOrchestrator],
})
export class MikroormModule {}
