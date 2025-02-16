import { Module } from "@nestjs/common";
import { MetricsServiceProvider } from "./providers";

@Module({
  providers: [MetricsServiceProvider],
  exports: [MetricsServiceProvider],
})
export class MetricsModule { }
