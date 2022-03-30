import { Module } from '@nestjs/common';
import { ConsumerController } from './controllers/consumer.controller';
import { ConsumerService } from './services/consumer.service';

@Module({
  imports: [],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule {}
