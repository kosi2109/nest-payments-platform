import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentsReadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(data: { paymentId: string; status: string }) {
    return this.prisma.paymentRead.upsert({
      where: { id: data.paymentId },
      create: {
        id: data.paymentId,
        status: data.status,
      },
      update: {
        status: data.status,
      },
    });
  }

  async findByPaymentId(paymentId: string) {
    return this.prisma.paymentRead.findUnique({
      where: { id: paymentId },
    });
  }
}
