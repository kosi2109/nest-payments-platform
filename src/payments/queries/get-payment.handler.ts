import { QueryHandler } from '@nestjs/cqrs';
import { GetPaymentQuery } from './get-payment.query';
import { PaymentsReadRepository } from '../repositories/payments-read.repository';

@QueryHandler(GetPaymentQuery)
export class GetPaymentHandler {
  constructor(private readonly readRepo: PaymentsReadRepository) {}

  async execute(query: GetPaymentQuery) {
    return this.readRepo.findByPaymentId(query.paymentId);
  }
}
