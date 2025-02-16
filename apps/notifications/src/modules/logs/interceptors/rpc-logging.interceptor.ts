import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { tap } from 'rxjs/operators';

@Injectable()
export class RpcLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RpcLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler) {
    const type = context.getType();

    const isRpc = type === 'rpc';

    if (!isRpc) {
      return next.handle();
    }

    const request = context.switchToRpc()

    const rpcContext = request.getContext<RmqContext>();

    const pattern = rpcContext.getPattern();

    this.logger.log(`Incoming RPC request: ${pattern}`);

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;

        this.logger.log(
          `Outgoing RPC response: ${pattern} ${duration}ms`,
        );
      }),
    );
  }
}
