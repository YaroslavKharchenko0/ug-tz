import { Module } from "@nestjs/common";
import { NotificationClientProvider } from "./providers";

@Module({
  imports: [],
  controllers: [],
  providers: [NotificationClientProvider],
  exports: [NotificationClientProvider]
})
export class NotificationModule { }
