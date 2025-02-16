import { Module } from "@nestjs/common";
import { HTTPLoggingProvider, RPCLoggingProvider } from "./providers";

@Module({
  providers: [HTTPLoggingProvider, RPCLoggingProvider],
})
export class LogsModule { }
