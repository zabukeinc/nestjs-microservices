import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModel } from 'src/modules/transaction/data/models/consumers/user.model';
import { TransactionItemModel } from 'src/modules/transaction/data/models/transaction-item.model';
import { TransactionModel } from 'src/modules/transaction/data/models/transaction.model';
import { TransactionService } from 'src/modules/transaction/data/services/transaction.service';
import { UserService } from 'src/modules/transaction/data/services/user.service';
import { TransactionOrchestrator } from 'src/modules/transaction/domain/usecases/transaction.orchestrator';
import { UserConsumer } from 'src/modules/transaction/infrastructure/consumers/user/user.consumer';
import { TransactionController } from 'src/modules/transaction/infrastructure/controllers/transaction.controller';
import { TransactionProducer } from 'src/modules/transaction/infrastructure/producers/transaction.producer';
import { TRANSACTION_COMMAND_CONNECTION } from 'src/modules/transaction/utils/connection-name.util';

export const MODELS = [TransactionModel, TransactionItemModel, UserModel];

export const PROVIDERS = [
  TransactionService,
  TransactionOrchestrator,
  TransactionProducer,

  UserService,
];

export const CONTROLLERS = [TransactionController, UserConsumer];

export const PORT = 3001;

export const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';
export const KAFKA_RETRIES = process.env.KAFKA_RETRIES || 100000;
export const KAFKA_CLIENT_ID =
  process.env.KAFKA_CLIENT_ID || 'transaction-service';
export const KAFKA_GROUP_ID = process.env.GROUP_ID || 'transaction-consumer';
export const KAFKA_NAME = process.env.KAFKA_NAME || 'transaction-service';

export const DATABASE_CONFIGURATION: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  // password: process.env.MYSQL_PASSWORD,
  database: 'itmi-nestjs-second',
  entities: MODELS,
  synchronize: true,
  name: TRANSACTION_COMMAND_CONNECTION,
};
