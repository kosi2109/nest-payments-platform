import { Injectable } from '@nestjs/common';
import { PaymentProvider } from './payment-provider';

@Injectable()
export class StripeProvider implements PaymentProvider {
  async charge(amount: number, currency: string) {
    console.log(`[Stripe] Charging ${amount} ${currency}`);
    // Here would be Stripe SDK call
  }

  async refund(paymentId: string) {
    console.log(`[Stripe] Refunding payment ${paymentId}`);
  }
}
