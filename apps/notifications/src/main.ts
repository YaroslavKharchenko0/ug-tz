import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DI } from './di';
import { AppConfig, MicroserviceConfig } from './config';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: AppConfig = app.get(DI.APP.CONFIG);

  const microserviceConfig: MicroserviceConfig = app.get(DI.MICROSERVICE.CONFIG);

  app.connectMicroservice<MicroserviceOptions>(microserviceConfig);

  await app.startAllMicroservices();

  await app.listen(appConfig.port, appConfig.host);

  Logger.log(`Application is running on: ${await app.getUrl()}`);

  Logger.log(`Notification service is running on`);
}

bootstrap();
