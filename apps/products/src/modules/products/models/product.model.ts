import { Product } from "@app/shared";

export class ProductModel implements Product {
  id: number;
  name: string;
  price: number;

  static fromEntity(entity: Product): ProductModel {
    return new ProductModel().setInput(entity);
  }

  private setInput(input: Product) {
    this.id = Number(input.id);
    this.name = input.name;
    this.price = Number(input.price);

    return this;
  }
}
