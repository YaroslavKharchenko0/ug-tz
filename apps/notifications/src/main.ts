import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DI } from './di';
import { AppConfig } from './config';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(AppModule);

  const appConfig: AppConfig = context.get(DI.APP.CONFIG)

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, appConfig);

  await app.listen();

  Logger.log(
    `🚀 Notification service is running`
  );
}

bootstrap();
