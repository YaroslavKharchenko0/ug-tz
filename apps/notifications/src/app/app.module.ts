import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigProvider, MicroserviceConfigProvider } from '../config';
import { ProductsModule } from '../modules';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProductsModule],
  controllers: [],
  providers: [AppConfigProvider, MicroserviceConfigProvider],
})
export class AppModule { }
