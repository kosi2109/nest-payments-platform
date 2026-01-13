import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ChargePaymentCommand } from './commands/charge-payment.command';
import { GetPaymentQuery } from './queries/get-payment.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.queryBus.execute(new GetPaymentQuery(id));
  }

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
    return this.commandBus.execute(
      new ChargePaymentCommand(
        body.amount,
        body.currency,
        body.service,
        body.idempotencyKey,
      ),
    );
  }

  @Post('refund')
  async refund(@Body() body: { paymentId: string; service: string }) {
    return this.paymentsService.refund(body.paymentId, body.service);
  }
}
