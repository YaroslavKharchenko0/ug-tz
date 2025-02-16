import { createProductSchema, paginationValidationSchema } from '@app/shared';
import { createZodDto } from 'nestjs-zod'

export class CreateProductDto extends createZodDto(createProductSchema) { }

export class FindProductQueryDto extends createZodDto(paginationValidationSchema) { }
