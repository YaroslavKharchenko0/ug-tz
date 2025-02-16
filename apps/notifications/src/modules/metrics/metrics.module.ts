import { Module } from "@nestjs/common";
import { MetricsServiceProvider } from "./providers";
import { HttpMetricsController } from "./controllers";

@Module({
  controllers: [HttpMetricsController],
  providers: [MetricsServiceProvider],
  exports: [MetricsServiceProvider],
})
export class MetricsModule { }
