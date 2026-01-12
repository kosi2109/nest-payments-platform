export abstract class PaymentProvider {
  abstract charge(amount: number, currency: string): Promise<void>;
  abstract refund(paymentId: string): Promise<void>;
}
