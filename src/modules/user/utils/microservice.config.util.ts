import { registerAs } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

export const KAFKA_CLIENT_NAME = 'user-kafka';

export default registerAs(
  'kafkaClientConfig',
  (): KafkaOptions => ({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user-client-id',
        brokers: ['localhost:9092'],
        retry: {
          retries: 100000,
        },
      },
      consumer: {
        groupId: 'user-consumer',
      },
    },
  }),
);
