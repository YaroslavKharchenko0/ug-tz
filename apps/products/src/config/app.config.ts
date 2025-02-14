import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DI } from '../di'

export interface AppConfig {
  host: string;
  port: number;
}

export const createAppConfig = (configService: ConfigService): AppConfig => {
  return {
    host: configService.get<string>('HOST', '0.0.0.0'),
    port: configService.get<number>('PORT', 4000),
  }
}

export const AppConfigProvider: Provider = {
  provide: DI.APP.CONFIG,
  useFactory: createAppConfig,
  inject: [ConfigService],
}
