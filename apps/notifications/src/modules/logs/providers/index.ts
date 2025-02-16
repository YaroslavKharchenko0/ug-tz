import { Provider } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HttpLoggingInterceptor, RpcLoggingInterceptor } from "../interceptors";

export const HTTPLoggingProvider: Provider = {
  provide: APP_INTERCEPTOR,
  useClass: HttpLoggingInterceptor,
}

export const RPCLoggingProvider: Provider = {
  provide: APP_INTERCEPTOR,
  useClass: RpcLoggingInterceptor,
}
