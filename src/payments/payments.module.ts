import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { StripeProvider } from './providers/stripe-provider';
import { KBZProvider } from './providers/kbz-provider';
import { PaymentProviderFactory } from './factories/payment-provider.factory';

@Module({
  providers: [
    PaymentsService,
    PaymentProviderFactory,
    StripeProvider,
    KBZProvider,
  ],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
