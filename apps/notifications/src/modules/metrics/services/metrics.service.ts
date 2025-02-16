import * as client from 'prom-client';


export type IncrementEvent = {
  domain: 'product';
  action: 'created' | 'deleted';
}

export interface MetricsService {
  incrementCount(event: IncrementEvent): void;
}

export class PrometheusMetricsService implements MetricsService {
  private readonly register: client.Registry;

  private readonly counterMap: Map<string, client.Counter<string>>;

  private createCounterKey(event: IncrementEvent): string {
    return `${event.domain}_${event.action}`;
  }

  constructor() {
    this.register = new client.Registry();

    this.register.setDefaultLabels({ app: 'notifications' });
    client.collectDefaultMetrics({ register: this.register });

    const productCreatedKey = this.createCounterKey({ domain: 'product', action: 'created' });

    this.counterMap = new Map();

    this.counterMap.set(productCreatedKey, new client.Counter({
      name: 'products_created_total',
      help: 'Total number of products created',
      registers: [this.register],
    }));

    const productDeletedKey = this.createCounterKey({ domain: 'product', action: 'deleted' });

    this.counterMap.set(productDeletedKey, new client.Counter({
      name: 'products_deleted_total',
      help: 'Total number of products deleted',
      registers: [this.register],
    }));
  }
  incrementCount(event: IncrementEvent): void {
    const key = this.createCounterKey(event);

    const counter = this.counterMap.get(key);

    if (!counter) {
      throw new Error(`Counter not found for key: ${key}`);
    }

    counter.inc();
  }
}
