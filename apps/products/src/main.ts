import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfig } from './config';
import { DI } from './di';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(AppModule);

  const appConfig: AppConfig = context.get(DI.APP.CONFIG);

  const app = await NestFactory.create(AppModule);

  await app.listen(appConfig.port, appConfig.host);

  const url = await app.getUrl();

  Logger.log(`🚀 Application is running on: ${url}`);
}

bootstrap().catch((error) => {
  Logger.error(error);
  process.exit(1);
});
