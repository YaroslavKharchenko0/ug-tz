import { Module } from "@nestjs/common";
import { ProductEventController } from "./controllers";
import { MetricsModule } from "../metrics";

@Module({
  imports: [MetricsModule],
  controllers: [ProductEventController],
})
export class ProductsModule { }
