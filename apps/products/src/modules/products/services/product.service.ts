import { CreateProduct, DeleteProduct, Pagination, Product } from "@app/shared";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PgProductRepository, ProductRepository } from "../repositories";

export interface FindProducts {
  pagination: Pagination;
}

export interface ProductService {
  createProduct(input: CreateProduct): Promise<Product | null>;
  deleteProduct(input: DeleteProduct): Promise<void>;
  findProducts(input: FindProducts): Promise<Product[]>;
}

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(@Inject(PgProductRepository) private readonly repository: ProductRepository) { }

  async createProduct(input: CreateProduct): Promise<Product | null> {
    return this.repository.createProduct(input);
  }
  async deleteProduct(input: DeleteProduct): Promise<void> {
    const result = await this.repository.deleteProduct(input);

    if (result.affectedRows === 0) {
      throw new NotFoundException('Product not found');
    }
  }
  findProducts(input: FindProducts): Promise<Product[]> {
    return this.repository.findProducts(input);
  }
}
