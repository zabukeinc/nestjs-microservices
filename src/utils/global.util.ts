import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserAddressModel } from 'src/modules/user-address/data/models/user-address.model';
import { UserAddressService } from 'src/modules/user-address/data/services/user-address.service';
import { UserAddressOrchestrator } from 'src/modules/user-address/domain/usecases/user-address.orchestrator';
import { UserAddressController } from 'src/modules/user-address/infrastructure/controllers/user-address.controller';
import { TransactionModel } from 'src/modules/user/data/models/consumers/transaction.model';
import { UserPinModel } from 'src/modules/user/data/models/user-pin.model';
import { UserModel } from 'src/modules/user/data/models/user.model';
import { TransactionService } from 'src/modules/user/data/services/consumers/transaction.service';
import { UserService } from 'src/modules/user/data/services/user.service';
import { UserOrchestrator } from 'src/modules/user/domain/usecases/user.orchestrator';
import { TransactionConsumer } from 'src/modules/user/infrastructure/consumers/transaction/transaction.consumer';
import { UserController } from 'src/modules/user/infrastructure/controllers/user.controller';
import { UserProducer } from 'src/modules/user/infrastructure/producers/user.producer';
import { USER_COMMAND_CONNECTION } from 'src/modules/user/utils/connection-name.util';

export const MODELS = [UserModel, UserPinModel, UserAddressModel, TransactionModel];

export const PROVIDERS = [
  UserService,
  UserOrchestrator,
  UserAddressOrchestrator,
  UserAddressService,
  UserProducer,

  TransactionService,
];

export const CONTROLLERS = [
  UserController,
  UserAddressController,

  TransactionConsumer
];

export const PORT = 3000;

export const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';
export const KAFKA_RETRIES = process.env.KAFKA_RETRIES || 100000;
export const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || 'user-service';
export const KAFKA_GROUP_ID = process.env.GROUP_ID || 'user-consumer';
export const KAFKA_NAME = process.env.KAFKA_NAME || 'user-service';

export const DATABASE_CONFIGURATION: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  // password: process.env.MYSQL_PASSWORD,
  database: 'itmi-nestjs',
  entities: MODELS,
  synchronize: true,
  name: USER_COMMAND_CONNECTION,
};
