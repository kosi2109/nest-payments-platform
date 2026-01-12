import { Injectable } from '@nestjs/common';
import { PaymentProvider } from './providers/payment-provider';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentProviderFactory } from './factories/payment-provider.factory';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly factory: PaymentProviderFactory,
    private prisma: PrismaService,
  ) {}

  async pay(
    amount: number,
    currency: string,
    idempotencyKey: string,
    service: string,
  ) {
    // Check if this payment was already processed
    const existing = await this.prisma.payment.findUnique({
      where: { idempotencyKey },
    });
    if (existing) {
      return { status: 'already_processed', provider: existing.provider };
    }

    const provider = this.factory.getProvider(service);

    await provider.charge(amount, currency);

    const payment = await this.prisma.payment.create({
      data: {
        amount,
        currency,
        provider: service,
        idempotencyKey,
        status: 'success',
      },
    });

    // Emit events or save to DB later
    return payment;
  }

  async refund(paymentId: string, service: string) {
    const provider = this.factory.getProvider(service);
    await provider.refund(paymentId);
    return { status: 'refunded' };
  }
}
