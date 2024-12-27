import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      clientId: `backend-smkmq`,
      brokers: [`localhost:9092`],
      retry: {
        retries: 5, // Number of retries
        initialRetryTime: 300, // Initial wait time in ms before retrying
      },
    },
    consumer: {
      groupId: `smkmq-group-1`,
    },
  },
};
