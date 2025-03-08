/*
  Warnings:

  - You are about to drop the column `level` on the `matriz_gold` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `matriz_gold` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `matriz_gold` table. All the data in the column will be lost.
  - You are about to drop the `matriz_elite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "matriz_elite" DROP CONSTRAINT "matriz_elite_parentId_fkey";

-- DropForeignKey
ALTER TABLE "matriz_elite" DROP CONSTRAINT "matriz_elite_userId_fkey";

-- DropForeignKey
ALTER TABLE "matriz_gold" DROP CONSTRAINT "matriz_gold_parentId_fkey";

-- AlterTable
ALTER TABLE "matriz_gold" DROP COLUMN "level",
DROP COLUMN "parentId",
DROP COLUMN "position";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "matriz_elite";

-- CreateTable
CREATE TABLE "indicates" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nominees" TEXT[],

    CONSTRAINT "indicates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matriz_cooper" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "matriz_cooper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matriz_silver" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "matriz_silver_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "indicates" ADD CONSTRAINT "indicates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriz_cooper" ADD CONSTRAINT "matriz_cooper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriz_silver" ADD CONSTRAINT "matriz_silver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
