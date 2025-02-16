import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigProvider } from '../config';
import { LogsModule, ProductsModule } from '../modules';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProductsModule, LogsModule],
  providers: [AppConfigProvider],
})
export class AppModule { }
