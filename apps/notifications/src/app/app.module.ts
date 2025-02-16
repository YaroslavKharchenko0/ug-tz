import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigProvider, MicroserviceConfigProvider } from '../config';
import { LogsModule, MetricsModule, ProductsModule } from '../modules';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProductsModule, LogsModule, MetricsModule],
  controllers: [],
  providers: [AppConfigProvider, MicroserviceConfigProvider],
})
export class AppModule { }
