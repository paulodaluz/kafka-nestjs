import { IsString } from 'class-validator';
import { ProducerBody } from '../interfaces/producerBody.interface';

export class ProducerBodyValidator implements ProducerBody {
  @IsString()
  message: string;
}
