import { Product } from "../../types";
import { productSchema } from "../../validation"

export class CreateProductEvent {
  static readonly topic = 'product.created.event'

  static readonly schema = productSchema;

  static readonly createPayload = (input: unknown) => {
    const result = CreateProductEvent.schema.safeParse(input)

    if (!result.success) {
      throw new Error('Invalid input')
    }

    return result.data
  }

  static readonly parsePayload = (input: unknown): Product => {
    const result = CreateProductEvent.schema.safeParse(input)

    if (!result.success) {
      throw new Error('Invalid input')
    }

    return result.data
  }
}
