import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigProvider } from '../config';
import { ProductsModule } from '../modules';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProductsModule],
  controllers: [],
  providers: [AppConfigProvider],
})
export class AppModule { }
