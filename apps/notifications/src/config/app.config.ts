import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DI } from '../di'
import { RmqOptions, Transport } from "@nestjs/microservices";

export type AppConfig = RmqOptions

export const createAppConfig = (configService: ConfigService): AppConfig => {
  return {
    transport: Transport.RMQ,
    options: {
      urls: configService.get<string[]>('RMQ_URLS'),
      queue: configService.get<string>('RMQ_QUEUE'),
      exchange: configService.get<string>('RMQ_EXCHANGE'),
    }
  }
}

export const AppConfigProvider: Provider = {
  provide: DI.APP.CONFIG,
  useFactory: createAppConfig,
  inject: [ConfigService],
}
