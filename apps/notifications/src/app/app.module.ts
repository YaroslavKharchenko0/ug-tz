import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigProvider } from '../config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [AppConfigProvider],
})
export class AppModule { }
