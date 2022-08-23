import { JubelioService } from '@hope-module/data/services/jubelio.service';
import { HopeOrchestrator } from '@hope-module/domain/usecases/hope.orchestrator';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TransactionModel } from '@user-module/data/models/consumers/transaction.model';
import { UserPinModel } from '@user-module/data/models/user-pin.model';
import { UserModel } from '@user-module/data/models/user.model';
import { TransactionService } from '@user-module/data/services/consumers/transaction.service';
import { UserService } from '@user-module/data/services/user.service';
import { UserOrchestrator } from '@user-module/domain/usecases/user.orchestrator';
import { TransactionConsumer } from '@user-module/infrastructure/consumers/transaction/transaction.consumer';
import { UserController } from '@user-module/infrastructure/controllers/user.controller';
import { UserProducer } from '@user-module/infrastructure/producers/user.producer';
import { USER_COMMAND_CONNECTION } from '@user-module/utils/connection-name.util';

export const MODELS = [
  UserModel,
  UserPinModel,
  TransactionModel,
];

export const PROVIDERS = [
  UserService,
  UserOrchestrator,
  UserProducer,

  TransactionService,

  JubelioService,
  HopeOrchestrator
];

export const CONTROLLERS = [
  UserController,

  TransactionConsumer,
];

export const PORT = 3000;

export const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';
export const KAFKA_RETRIES = process.env.KAFKA_RETRIES || 100000;
export const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || 'user-service';
export const KAFKA_GROUP_ID = process.env.GROUP_ID || 'user-consumer';
export const KAFKA_NAME = process.env.KAFKA_NAME || 'user-service';

export const JUBELIO_HOST = 'https://api.jubelio.com';
export const JUBELIO_USER = 'technology@lifepack.id';
export const JUBELIO_PASSWORD = 'Itmidev!23';
export const JUBELIO_PRODUCT_SYNC_SWITCH = 1;
export const JUBELIO_WEBHOOK_SECRET = 'jubelio - dev';
export const JUBELIO_TIMEOUT = 40000;


export const DATABASE_CONFIGURATION: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'itmi-nestjs',
  entities: MODELS,
  synchronize: true,
  name: USER_COMMAND_CONNECTION,
};
