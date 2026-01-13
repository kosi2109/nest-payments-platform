import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentReadProvider } from './payments-read-provider';

@Injectable()
export class PaymentsReadRedisRepository implements PaymentReadProvider {
  constructor(@Inject('REDIS') private readonly redis: Redis) {}

  async upsert(data: { paymentId: string; status: string }) {
    await this.redis.set(
      `payment:${data.paymentId}`,
      JSON.stringify({ paymentId: data.paymentId, status: data.status }),
    );
  }

  async findByPaymentId(paymentId: string) {
    const data = await this.redis.get(`payment:${paymentId}`);

    return data ? JSON.parse(data) : null;
  }
}
