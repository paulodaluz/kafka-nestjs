import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ProducerBodyValidator } from '../validators/producerBody.validator';
import { ProducerService } from '../services/producer.service';

@Controller()
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('send-message')
  sendMessage(@Body(new ValidationPipe()) body: ProducerBodyValidator): Promise<void> {
    return this.producerService.sendMessage(body.message);
  }
}
