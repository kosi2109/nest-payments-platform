import { Injectable } from '@nestjs/common';
import { PaymentProvider } from './payment-provider';

@Injectable()
export class KBZProvider implements PaymentProvider {
  async charge(amount: number, currency: string) {
    console.log(`[KBZ] Charging ${amount} ${currency}`);
    // Here would be Stripe SDK call
  }

  async refund(paymentId: string) {
    console.log(`[KBZ] Refunding payment ${paymentId}`);
  }
}
