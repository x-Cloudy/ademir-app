/*
  Warnings:

  - Made the column `codeInvite` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "codeInvite" SET NOT NULL,
ALTER COLUMN "codeInvite" SET DEFAULT 'MS1zM2NyM3Q';
