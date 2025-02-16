import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DI } from '../di'
import { RmqOptions, Transport } from "@nestjs/microservices";

export type MicroserviceConfig = RmqOptions

export const createMicroserviceConfig = (configService: ConfigService): MicroserviceConfig => {
  return {
    transport: Transport.RMQ,
    options: {
      urls: configService.get<string[]>('RMQ_URLS'),
      queue: configService.get<string>('RMQ_QUEUE'),
      exchange: configService.get<string>('RMQ_EXCHANGE'),
    }
  }
}

export const MicroserviceConfigProvider: Provider = {
  provide: DI.MICROSERVICE.CONFIG,
  useFactory: createMicroserviceConfig,
  inject: [ConfigService],
}
