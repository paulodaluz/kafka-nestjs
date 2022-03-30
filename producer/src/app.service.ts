import { Injectable } from '@nestjs/common';
import { logLevel } from 'kafkajs';
const { Kafka } = require('kafkajs');

@Injectable()
export class AppService {
  constructor() {}
  async getHello() {
    const kafka = new Kafka({
      clientId: 'chat-of-messages',
      brokers: ['localhost:9092'],
      logLevel: logLevel.INFO,
    });

    const producer = await kafka.producer();

    await producer.connect();
    await producer.send({
      topic: 'paulo-user',
      messages: [{ value: 'Hello KafkaJS user!' }],
    });

    await producer.disconnect();
  }
}
