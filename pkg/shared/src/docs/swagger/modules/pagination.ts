import { ApiProperty } from "@nestjs/swagger";

export class PaginationQueryDocs {
  @ApiProperty({
    description: 'Offset number',
    example: 1,
    default: 0,
    minimum: 0,
    required: false,
  })
  offset!: number;

  @ApiProperty({
    description: 'Limit size',
    example: 10,
    minimum: 1,
    maximum: 100,
    required: false,
  })
  limit!: number;
}
