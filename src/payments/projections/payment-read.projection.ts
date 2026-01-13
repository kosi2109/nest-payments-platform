import { EventsHandler } from '@nestjs/cqrs';
import { PaymentSucceededEvent } from '../events/payment-succeeded.event';
import { PaymentsReadRedisRepository } from '../repositories/payments-read-redis.repository';
import { PaymentReadProvider } from '../repositories/payments-read-provider';

// event listerner
@EventsHandler(PaymentSucceededEvent)
export class PaymentReadProjection {
  constructor(private readonly readRepo: PaymentReadProvider) {}

  async handle(event: PaymentSucceededEvent) {
    await this.readRepo.upsert({
      paymentId: event.paymentId,
      status: 'SUCCESS',
    });
  }
}
