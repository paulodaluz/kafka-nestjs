import { Module } from '@nestjs/common';
import { ProducerController } from './controllers/producer.controller';
import { ProducerService } from './services/producer.service';

@Module({
  imports: [],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
