import { applyDecorators } from "@nestjs/common";
import { Product } from "../../..";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export const productExample: Product = {
  id: 1,
  name: 'Product 1',
  price: 100
}

export const CreateProductDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create product', description: 'Create a new product' }),
    ApiResponse({
      status: 201,
      description: 'Product created',
      example: productExample
    }),
    ApiResponse({ status: 400, description: 'Validation failed' })
  );
}

export const DeleteProductDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete product', description: 'Delete a product by id' }),
    ApiResponse({ status: 204, description: 'Product deleted' }),
    ApiResponse({ status: 404, description: 'Product not found' }));
}

export const FindProductsDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Find products', description: 'Find products' }),
    ApiResponse({ status: 200, description: 'Products found', isArray: true, example: [productExample] }));
}
