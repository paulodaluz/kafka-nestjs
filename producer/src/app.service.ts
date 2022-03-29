import { Injectable } from '@nestjs/common';
const { Kafka } = require('kafkajs');

@Injectable()
export class AppService {
  async getHello() {
    const kafka = new Kafka({
      clientId: 'hero',
      brokers: ['localhost:9092'],
    });

    const producer = kafka.producer();

    await producer.connect();
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: 'Hello KafkaJS user!' }],
    });
  }
}
