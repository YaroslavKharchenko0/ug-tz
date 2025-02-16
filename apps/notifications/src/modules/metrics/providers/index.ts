import { Provider } from "@nestjs/common";
import { DI } from "../../../di";
import { PrometheusMetricsService } from "../services";

export const MetricsServiceProvider: Provider = {
  provide: DI.METRICS.SERVICE,
  useClass: PrometheusMetricsService,
}
