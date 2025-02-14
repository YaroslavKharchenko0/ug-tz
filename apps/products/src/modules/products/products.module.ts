import { Module } from "@nestjs/common";
import { DatabaseConfigProvider } from "../../config";
import { PgClientProvider } from "../../database/client";

@Module({
  providers: [PgClientProvider, DatabaseConfigProvider],
})
export class ProductsModule { }
