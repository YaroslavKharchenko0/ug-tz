import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { DI } from "../../../di";
import { ConfigService } from "@nestjs/config";
import { Provider } from "@nestjs/common";


export const NotificationClientProvider: Provider = {
  provide: DI.NOTIFICATION.CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: configService.get('NOTIFICATION_RMQ_URLS'),
        queue: configService.get('NOTIFICATION_RMQ_QUEUE'),
        exchange: configService.get('NOTIFICATION_RMQ_EXCHANGE'),
      }
    })

    return client;
  }
}
