-- CreateTable
CREATE TABLE "opcoes" (
    "id" SERIAL NOT NULL,
    "wallet" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "opcoes_pkey" PRIMARY KEY ("id")
);
