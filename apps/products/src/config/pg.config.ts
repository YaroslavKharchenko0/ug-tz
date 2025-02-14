import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DI } from '../di'

export interface PgConfig {
  host: string;
  port: number;
  password: string;
  database: string;
  user: string;
  ssl: boolean;
}

export const createPgConfig = (configService: ConfigService): PgConfig => {
  return {
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    user: configService.get<string>('DATABASE_USER'),
    ssl: configService.get<string>('DATABASE_SSL', 'false') === 'true',
  }
}

export const DatabaseConfigProvider: Provider = {
  provide: DI.DATABASE.CONFIG,
  useFactory: createPgConfig,
  inject: [ConfigService],
}
