/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `matrix_elite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `matrix_gold` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "matrix_elite" DROP CONSTRAINT "matrix_elite_parentId_fkey";

-- DropForeignKey
ALTER TABLE "matrix_elite" DROP CONSTRAINT "matrix_elite_userId_fkey";

-- DropForeignKey
ALTER TABLE "matrix_gold" DROP CONSTRAINT "matrix_gold_parentId_fkey";

-- DropForeignKey
ALTER TABLE "matrix_gold" DROP CONSTRAINT "matrix_gold_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "matrix_elite";

-- DropTable
DROP TABLE "matrix_gold";

-- CreateTable
CREATE TABLE "matriz_gold" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "level" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "matriz_gold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matriz_elite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "level" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "matriz_elite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "matriz_gold" ADD CONSTRAINT "matriz_gold_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriz_gold" ADD CONSTRAINT "matriz_gold_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "matriz_gold"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriz_elite" ADD CONSTRAINT "matriz_elite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriz_elite" ADD CONSTRAINT "matriz_elite_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "matriz_elite"("id") ON DELETE SET NULL ON UPDATE CASCADE;
