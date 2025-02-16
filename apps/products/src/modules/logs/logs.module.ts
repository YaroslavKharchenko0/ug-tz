import { Module } from "@nestjs/common";
import { HTTPLoggingProvider } from "./providers";

@Module({
  providers: [HTTPLoggingProvider],
})
export class LogsModule { }
