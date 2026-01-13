-- CreateTable
CREATE TABLE "PaymentRead" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentRead_pkey" PRIMARY KEY ("id")
);
