import { Module } from "@nestjs/common";
import { ProductEventController } from "./controllers";

@Module({
  controllers: [ProductEventController],
})
export class ProductsModule { }
