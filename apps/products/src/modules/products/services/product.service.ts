import { CreateProduct, CreateProductEvent, DeleteProduct, DeleteProductEvent, Pagination, Product } from "@app/shared";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PgProductRepository, ProductRepository } from "../repositories";
import { DI } from "../../../di";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

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
  constructor(
    @Inject(PgProductRepository) private readonly repository: ProductRepository,
    @Inject(DI.NOTIFICATION.CLIENT) private readonly notificationClient: ClientProxy
  ) { }

  async createProduct(input: CreateProduct): Promise<Product | null> {
    const product = await this.repository.createProduct(input);

    if (product) {
      await firstValueFrom(this.notificationClient.emit(CreateProductEvent.topic, CreateProductEvent.createPayload(product)));
    }

    return product;
  }
  async deleteProduct(input: DeleteProduct): Promise<void> {
    const product = await this.repository.deleteProduct(input);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await firstValueFrom(this.notificationClient.emit(DeleteProductEvent.topic, DeleteProductEvent.createPayload(product)));
  }
  findProducts(input: FindProducts): Promise<Product[]> {
    return this.repository.findProducts(input);
  }
}
