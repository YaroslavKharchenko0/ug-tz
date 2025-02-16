import { Controller, Get, Inject } from "@nestjs/common";
import { DI } from "../../../di";
import { MetricsService } from "../services";

@Controller('metrics')
export class HttpMetricsController {
  constructor(@Inject(DI.METRICS.SERVICE) private readonly metricsService: MetricsService) { }

  @Get()
  async getMetrics(): Promise<string> {
    const metrics = await this.metricsService.getMetrics();

    return metrics;
  }
}
