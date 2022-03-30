import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConsumerService } from '../services/consumer.service';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @MessagePattern('paulo-user')
  getMessage(@Payload() message: any): void {
    this.consumerService.getMessage(message.topic, message.value);
  }
}
