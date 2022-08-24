import { registerAs } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { KAFKA_BROKER, KAFKA_CLIENT_ID, KAFKA_GROUP_ID } from './global.util';

export const KAFKA_CLIENT_NAME = 'hope-logger-kafka';

export default registerAs(
  'kafkaClientConfig',
  (): KafkaOptions => ({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: KAFKA_CLIENT_ID,
        brokers: [KAFKA_BROKER],
        retry: {
          retries: 100000,
        },
      },
      consumer: {
        groupId: KAFKA_GROUP_ID,
      },
    },
  }),
);
