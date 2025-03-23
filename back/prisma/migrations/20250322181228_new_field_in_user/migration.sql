/*
  Warnings:

  - You are about to drop the `PasswordResetToken2` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "codeInvite" TEXT NOT NULL DEFAULT 'MTctczNjcjN0';

-- DropTable
DROP TABLE "PasswordResetToken2";

-- CreateTable
CREATE TABLE "PasswordResetToken1" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken1_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken1_email_key" ON "PasswordResetToken1"("email");
