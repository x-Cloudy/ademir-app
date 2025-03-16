/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `indicates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "indicates_userId_key" ON "indicates"("userId");
