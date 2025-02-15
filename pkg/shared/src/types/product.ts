import { z } from "zod";
import { createProductSchema, deleteProductSchema, productSchema } from "../validation";

export type Product = z.infer<typeof productSchema>;

export type CreateProduct = z.infer<typeof createProductSchema>;

export type DeleteProduct = z.infer<typeof deleteProductSchema>;
