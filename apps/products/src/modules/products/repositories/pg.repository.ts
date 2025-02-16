import { CreateProduct, DeleteProduct, Pagination, Product } from "@app/shared";
import { Inject, Injectable } from "@nestjs/common";
import { DI } from "../../../di";
import { PoolClient } from "pg";
import { ProductModel } from "../models";

export interface FindProducts {
  pagination: Pagination;
}


export interface ProductRepository {
  createProduct(input: CreateProduct): Promise<ProductModel | null>;
  deleteProduct(input: DeleteProduct): Promise<ProductModel | null>;
  findProducts(input: FindProducts): Promise<ProductModel[]>;
}

@Injectable()
export class PgProductRepository implements ProductRepository {
  constructor(@Inject(DI.DATABASE.CLIENT) private readonly client: PoolClient) { }

  private readonly table = 'products';

  async createProduct(input: CreateProduct): Promise<ProductModel | null> {
    const { name, price } = input;

    const { rows } = await this.client.query<Product>(
      `INSERT INTO ${this.table} (name, price) VALUES ($1, $2) RETURNING *`,
      [name, price]
    );

    const [product] = rows;

    return ProductModel.fromEntity(product);
  }

  async deleteProduct(input: DeleteProduct): Promise<ProductModel | null> {
    const { id } = input;

    const { rows } = await this.client.query<Product>(`DELETE FROM ${this.table} WHERE id = $1 RETURNING id, name, price`, [id]);

    const [product] = rows || [];

    if (!product) return null;

    return ProductModel.fromEntity(product);
  }

  async findProducts(input: FindProducts): Promise<ProductModel[]> {
    const { pagination } = input;

    const { limit = 10, offset = 0 } = pagination;

    if (limit > 100) throw new Error('Limit cannot be greater than 100');

    const { rows } = await this.client.query<Product>(
      `SELECT * FROM ${this.table} LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    return rows.map(ProductModel.fromEntity);
  }
}
