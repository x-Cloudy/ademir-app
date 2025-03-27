/*
  Warnings:

  - You are about to drop the column `Indicator` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "Indicator",
ADD COLUMN     "indicator" TEXT;
