export abstract class PaymentReadProvider {
  abstract upsert(data: { paymentId: string; status: string }): Promise<any>;
  abstract findByPaymentId(paymentId: string): Promise<any>;
}
