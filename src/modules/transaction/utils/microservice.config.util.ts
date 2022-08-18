import { registerAs } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import {
  KAFKA_BROKER,
  KAFKA_CLIENT_ID,
  KAFKA_GROUP_ID,
  KAFKA_NAME,
} from 'src/utils/global.util';

export const KAFKA_CLIENT_NAME = 'transaction-kafka';

export default registerAs(
  'kafkaClientConfig',
  (): KafkaOptions => ({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'transaction-client-id',
        brokers: ['localhost:9092'],
        retry: {
          retries: 100000,
        },
      },
      consumer: {
        groupId: 'transaction-consumer',
      },
    },
  }),
);
