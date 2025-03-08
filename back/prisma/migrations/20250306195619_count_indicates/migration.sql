/*
  Warnings:

  - Added the required column `count` to the `indicates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "indicates" ADD COLUMN     "count" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tableText" (
    "id" SERIAL NOT NULL,
    "text" TEXT,

    CONSTRAINT "tableText_pkey" PRIMARY KEY ("id")
);
