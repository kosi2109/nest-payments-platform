export class ChargePaymentCommand {
  constructor(
    public readonly amount: number,
    public readonly currency: string,
    public readonly service: string,
    public readonly idempotencyKey: string,
  ) {}
}
