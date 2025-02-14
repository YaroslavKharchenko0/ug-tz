import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfig } from './config';
import { DI } from './di';
import { createSwagger } from '@app/shared';
import { applyMigrations } from './database/apply-migrations';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(AppModule);

  const appConfig: AppConfig = context.get(DI.APP.CONFIG);

  const app = await NestFactory.create(AppModule);

  createSwagger(app);

  await app.listen(appConfig.port, appConfig.host);

  const client = context.get(DI.DATABASE.CLIENT);

  await applyMigrations(client)

  const url = await app.getUrl();

  Logger.log(`🚀 Application is running on: ${url}`);
}

bootstrap().catch((error) => {
  Logger.error(error);
  process.exit(1);
});
