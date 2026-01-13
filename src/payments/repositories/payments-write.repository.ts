import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PaymentsWriteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByIdempotency(key: string) {
    return this.prisma.payment.findUnique({
      where: { idempotencyKey: key },
    });
  }

  async create(data: {
    amount: number;
    currency: string;
    provider: string;
    idempotencyKey: string;
    status: string;
  }) {
    return this.prisma.payment.create({ data });
  }
}