import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { StripeProvider } from './providers/stripe-provider';
import { KBZProvider } from './providers/kbz-provider';
import { PaymentProviderFactory } from './factories/payment-provider.factory';
import { PaymentsWriteRepository } from './repositories/payments-write.repository';
import { PaymentsReadRepository } from './repositories/payments-read.repository';
import { PaymentReadProjection } from './projections/payment-read.projection';
import { ChargePaymentHandler } from './commands/charge-payment.handler';
import { GetPaymentHandler } from './queries/get-payment.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  providers: [
    PaymentsService,
    PaymentProviderFactory,
    StripeProvider,
    KBZProvider,

    PaymentsWriteRepository,
    PaymentsReadRepository,
    PaymentReadProjection,

    ChargePaymentHandler,
    GetPaymentHandler,
  ],
  controllers: [PaymentsController],
  imports: [CqrsModule],
})
export class PaymentsModule {}
