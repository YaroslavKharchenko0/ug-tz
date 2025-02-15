import { z } from "zod";

export const offset = z.number().int().min(0).optional().default(0);

export const limit = z.number().int().positive().optional().default(10);

export const paginationValidationSchema = z.object({
  offset: z
    .string()
    .transform((value) => parseInt(value, 0))
    .refine(
      (value) => {
        return offset.safeParse(value).success;
      },
      {
        message: 'Offset should be a positive integer',
      },
    )
    .describe('Offset'),
  limit: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((value) => limit.safeParse(value).success, {
      message: 'Limit should be a positive integer',
    })
    .describe('Limit'),
});

export const paginationMetadataValidationSchema = z.object({
  total: z.number().int().positive().optional().default(0).describe('Total'),
});
