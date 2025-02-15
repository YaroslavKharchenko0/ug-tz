import { Module } from "@nestjs/common";
import { DatabaseConfigProvider } from "../../config";
import { PgClientProvider } from "../../database/client";
import { HttpController } from "./controllers";
import { PgProductRepository } from "./repositories";
import { ProductServiceImpl } from "./services";

@Module({
  controllers: [HttpController],
  providers: [PgClientProvider, DatabaseConfigProvider, PgProductRepository, ProductServiceImpl],
  exports: [PgProductRepository, ProductServiceImpl]
})
export class ProductsModule { }
