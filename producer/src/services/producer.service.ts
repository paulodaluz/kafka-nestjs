import { Injectable } from '@nestjs/common';
import { logLevel } from 'kafkajs';
import { Kafka } from 'kafkajs';

@Injectable()
export class ProducerService {
  async sendMessage(message: string): Promise<void> {
    const kafka = new Kafka({
      clientId: 'chat-of-messages',
      brokers: ['localhost:9092'],
      logLevel: logLevel.INFO,
    });

    const producer = kafka.producer();
    await producer.connect();

    await producer.send({
      topic: 'paulo-user',
      messages: [{ value: message }],
    });

    await producer.disconnect();
  }
}
