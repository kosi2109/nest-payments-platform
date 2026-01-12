import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('pay')
  async pay(
    @Body()
    body: {
      amount: number;
      currency: string;
      idempotencyKey: string;
      service: string;
    },
  ) {
    return this.paymentsService.pay(
      body.amount,
      body.currency,
      body.idempotencyKey,
      body.service,
    );
  }

  @Post('refund')
  async refund(@Body() body: { paymentId: string; service: string }) {
    return this.paymentsService.refund(body.paymentId, body.service);
  }
}
