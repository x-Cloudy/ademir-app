/*
  Warnings:

  - Added the required column `order` to the `matriz_cooper` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `matriz_gold` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `matriz_silver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matriz_cooper" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "matriz_gold" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "matriz_silver" ADD COLUMN     "order" INTEGER NOT NULL;
