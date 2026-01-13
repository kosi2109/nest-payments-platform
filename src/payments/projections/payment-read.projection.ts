import { EventsHandler } from '@nestjs/cqrs';
import { PaymentSucceededEvent } from '../events/payment-succeeded.event';
import { PaymentsReadRepository } from '../repositories/payments-read.repository';

@EventsHandler(PaymentSucceededEvent)
export class PaymentReadProjection {
  constructor(private readonly readRepo: PaymentsReadRepository) {}

  async handle(event: PaymentSucceededEvent) {
    await this.readRepo.upsert({
      paymentId: event.paymentId,
      status: 'SUCCESS',
    });
  }
}
