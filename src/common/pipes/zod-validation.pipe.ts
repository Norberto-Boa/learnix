import {
  PipeTransform,
  BadRequestException,
  type ArgumentMetadata,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { fromError, fromZodError } from 'zod-validation-error/v4';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      console.log(parsedValue);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: `Validation failed for ${metadata.type}`,
          statusCode: 400,
          errors: fromZodError(error),
        });
      }

      throw new BadRequestException('Validation failed');
    }
  }
}
