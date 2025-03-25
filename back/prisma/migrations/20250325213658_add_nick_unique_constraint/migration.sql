/*
  Warnings:

  - A unique constraint covering the columns `[nick]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_nick_key" ON "users"("nick");
