import { CreateProduct, DeleteProduct, Pagination, Product } from "@app/shared";
import { Inject, Injectable } from "@nestjs/common";
import { DI } from "../../../di";
import { PoolClient } from "pg";

export interface FindProducts {
  pagination: Pagination;
}

export interface DeleteProductResult {
  affectedRows: number;
}

export interface ProductRepository {
  createProduct(input: CreateProduct): Promise<Product | null>;
  deleteProduct(input: DeleteProduct): Promise<DeleteProductResult>;
  findProducts(input: FindProducts): Promise<Product[]>;
}

@Injectable()
export class PgProductRepository implements ProductRepository {
  constructor(@Inject(DI.DATABASE.CLIENT) private readonly client: PoolClient) { }

  private readonly table = 'products';

  async createProduct(input: CreateProduct): Promise<Product | null> {
    const { name, price } = input;

    const { rows } = await this.client.query<Product>(
      `INSERT INTO ${this.table} (name, price) VALUES ($1, $2) RETURNING *`,
      [name, price]
    );

    const [product] = rows;

    return product;
  }

  async deleteProduct(input: DeleteProduct): Promise<DeleteProductResult> {
    const { id } = input;

    const result = await this.client.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);

    return {
      affectedRows: result.rowCount
    };
  }

  async findProducts(input: FindProducts): Promise<Product[]> {
    const { pagination } = input;

    const { limit = 10, offset = 0 } = pagination;

    if (limit > 100) throw new Error('Limit cannot be greater than 100');

    const { rows } = await this.client.query<Product>(
      `SELECT * FROM ${this.table} LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    return rows;
  }
}
