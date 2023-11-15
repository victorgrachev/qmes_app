import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BodyPipe implements PipeTransform {
  transform(value: any, { metatype, type }: ArgumentMetadata) {
    if (type === 'body') {
      return plainToInstance(metatype, value, {
        excludeExtraneousValues: true,
      });
    }

    return value;
  }
}
