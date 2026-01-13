import { QueryHandler } from '@nestjs/cqrs';
import { GetPaymentQuery } from './get-payment.query';
import { PaymentReadProvider } from '../repositories/payments-read-provider';

@QueryHandler(GetPaymentQuery)
export class GetPaymentHandler {
  constructor(private readonly readRepo: PaymentReadProvider) {}

  async execute(query: GetPaymentQuery) {
    return this.readRepo.findByPaymentId(query.paymentId);
  }
}
