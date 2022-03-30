import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConsumerService {
  private className = 'ConsumerService';

  getMessage(topic: string, message: string): void {
    Logger.log(
      `topic = ${topic} - message = ${message}`,
      `${this.className} - ${this.getMessage.name}`,
    );
  }
}
