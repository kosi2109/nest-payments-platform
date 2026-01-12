import { Injectable } from '@nestjs/common';
import { PaymentProvider } from '../providers/payment-provider';
import { StripeProvider } from '../providers/stripe-provider';
import { KBZProvider } from '../providers/kbz-provider';

@Injectable()
export class PaymentProviderFactory {
  private providers: Record<string, PaymentProvider>;

  constructor(stripe: StripeProvider, kbz: KBZProvider) {
    this.providers = {
      stripe,
      kbz,
    };
  }

  getProvider(service: string): PaymentProvider {
    const provider = this.providers[service.toLowerCase()];
    if (!provider) throw new Error('Unsupported service');
    return provider;
  }
}
