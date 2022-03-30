import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConsumerModule } from './consumer.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ConsumerModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'chat-of-messages',
          brokers: ['localhost:9092'],
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
