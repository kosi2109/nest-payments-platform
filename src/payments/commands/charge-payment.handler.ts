import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { ChargePaymentCommand } from './charge-payment.command';
import { PaymentProviderFactory } from '../factories/payment-provider.factory';
import { PaymentSucceededEvent } from '../events/payment-succeeded.event';
import { PaymentsWriteRepository } from '../repositories/payments-write.repository';

@CommandHandler(ChargePaymentCommand)
export class ChargePaymentHandler {
  constructor(
    private readonly factory: PaymentProviderFactory,
    private readonly writeRepo: PaymentsWriteRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: ChargePaymentCommand) {
    const exists = await this.writeRepo.findByIdempotency(
      command.idempotencyKey,
    );
    if (exists) return exists;

    const provider = this.factory.getProvider(command.service);

    await provider.charge(command.amount, command.currency);

    const payment = await this.writeRepo.create({
      amount: command.amount,
      currency: command.currency,
      provider: command.service,
      idempotencyKey: command.idempotencyKey,
      status: 'SUCCESS',
    });

    this.eventBus.publish(new PaymentSucceededEvent(payment.id));

    return payment;
  }
}
