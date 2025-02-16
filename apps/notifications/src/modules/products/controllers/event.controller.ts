import { CreateProductEvent, DeleteProductEvent } from "@app/shared";
import { Controller, Inject } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { DI } from "../../../di";
import { MetricsService } from "../../metrics";

@Controller()
export class ProductEventController {
  constructor(@Inject(DI.METRICS.SERVICE) private readonly metricsService: MetricsService) { }

  @EventPattern(CreateProductEvent.topic)
  async onCreateProduct() {
    this.metricsService.incrementCount({ domain: 'product', action: 'created' });
  }

  @EventPattern(DeleteProductEvent.topic)
  async onDeleteProduct() {
    this.metricsService.incrementCount({ domain: 'product', action: 'deleted' });
  }
}
