import { Product } from "../../types";
import { productSchema } from "../../validation"

export class DeleteProductEvent {
  static readonly topic = 'product.deleted.event'

  static readonly schema = productSchema;

  static readonly createPayload = (input: unknown) => {
    const result = DeleteProductEvent.schema.safeParse(input)

    if (!result.success) {
      throw new Error('Invalid input')
    }

    return result.data
  }

  static readonly parsePayload = (input: unknown): Product => {
    const result = DeleteProductEvent.schema.safeParse(input)

    if (!result.success) {
      throw new Error('Invalid input')
    }

    return result.data
  }
}
