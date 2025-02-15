import { z } from "zod";
import { paginationValidationSchema, paginationMetadataValidationSchema } from "../validation";

export type Pagination = z.infer<typeof paginationValidationSchema>;

export type PaginationMetadata = z.infer<
  typeof paginationMetadataValidationSchema
>;
