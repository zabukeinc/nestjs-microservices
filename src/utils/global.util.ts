import { registerAs } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

export const KAFKA_CLIENT_NAME = 'mikroorm-kafka';
export const PORT = 3000;

export default registerAs(
  'kafkaClientConfig',
  (): KafkaOptions => ({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'mikroorm-client-id',
        brokers: ['localhost:9092'],
        retry: {
          retries: 100000,
        },
      },
      consumer: {
        groupId: 'mikroorm-consumer',
      },
    },
  }),
);
